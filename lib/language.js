
/*!
 * Lingo - Language
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var lingo = require('./lingo');

/**
 * Initialize a new `Language` with the given `code`.
 *
 * @param {String} code
 * @api public
 */

var Language = module.exports = function Language(code) {
  this.code = code;
  this.pluralCount = 2;
  this.pluralFormula = 'n == 1 ? 0 : 1';
  this.translations = {};
  this.rules = {
      plural: []
    , singular: []
    , uncountable: {}
    , irregular: { plural: {}, singular: {}}
  };
  lingo[code] = this;
};

/**
 * Translate the given `str` with optional `params`.
 *
 * @param {String} str
 * @param {Object} params
 * @return {String}
 * @api public
 */

Language.prototype.translate = function(str, params) {
  if (params) {
    var fn = this.translations[str] || str;
    if (typeof fn !== 'function') {
      fn = this.translations[str] = this.compileTranslation(str);
    }
    return fn(params);
  }
  
  str = this.translations[str] || str;
  return str.replace(/\\(.)/g, '$1');
};




function stringify(str) {
  // Remove escapes and then (re-)escape special chars.
  return "'" + str.replace(/\\(.)/g, '$1').replace(/([\\'])/g, '\\$1') + "'";
}

function tokenize(str, stringFn, tokenFn, regex) {
  var match, index = 0;
  var regex = /(\\*)\{([^:}]+)(?::((?:[^\\}]|\\.)+))?\}/g;

  // Thanks to lack of backreferences, we have to use this structure instead
  // of a simple replace.
  do {
    match = regex.exec(str);
    // Skip escaped tokens.
    if (match && (match[1].length % 2) > 0) {
      regex.lastIndex = match.index + match[1].length + 1;
      continue;
    }
    
    // Add string up to this match.
    var endIndex = match ? match.index + match[1].length : undefined;
    var before = str.substring(index, endIndex);
    index = regex.lastIndex;

    if (before) stringFn(before);
    if (match) tokenFn(match[0], match[2], match[3]);
  } while (match);
}

function interpolate(str) {
  var parts = [];

  tokenize(
    str,
    function(token) { parts.push(stringify(token)); },
    function(all, expr, plurals) { parts.push("(" + expr + ")"); }
  );

  return parts.join(' + ');
}

function demultiplex(str, i) {
  var parts = [];
  var regex = new RegExp('^(?:(?:[^\\\\|]|\\\\.)*\\|){' + (i || 0) +'}((?:[^\\\\|]|\\\\.)*)');

  tokenize(
    str,
    function(token) {
      parts.push(token);
    },
    function(all, expr, plurals) {
      if (!plurals) return parts.push(all);
      var match = plurals.match(regex);
      if (match) {
        return parts.push(match[1].replace(/(\\*)@/g, function(all, escaped) {
          if (escaped && escaped.length % 2) return all;
          else return escaped + '{' + expr + '}';
        }));
      }
    }
  );

  return parts.join('');
}

function pluralExpression(str) {
  var pluralExpr;
  
  tokenize(str, function() {}, function(all, variable, plurals) {
    if (plurals) pluralExpr = variable;
  });
  
  return pluralExpr;
}

Language.prototype.compileTranslation = function(str) {
  var pluralExpr = pluralExpression(str);
  var translation = this.translations[str] || str;
  
  if (!pluralExpr) {
    // There is no plural in this.
    var fn = 'with (params) return (' + interpolate(translation) + ');';
  }
  else {
    if (typeof translation === 'string') {
      // Parse string and convert them to array.
      var plurals = [];
      for (var i = 0; i < this.pluralCount; i++) {
        plurals.push(demultiplex(translation, i));
      }
      translation = plurals;
    }
    
    var fn =
      'with (params) {' +
      'var n = (' + pluralExpr + '), _pluralIndex = (' + this.pluralFormula + ');' +
        translation.map(function(str, i) {
          if (i === translation.length - 1) return 'return (' + interpolate(str) + ');';
          else return 'if (_pluralIndex === ' + i + ') return (' + interpolate(str) + ');';
        }).join('') + 
      '}';
  }
  
  return new Function('params', fn);
};
