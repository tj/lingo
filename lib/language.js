
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

Language.prototype.compileTranslation = function(str) {
  var pluralVariable = false;
  str = (this.translations[str] || str).replace(/'/g, "\\'");
  
  function interpolate(i) {
    return str.replace(/(\\*)\{([^:}]+)(?::([^}]+))?\}/g, function(all, escaped, key, plurals) {
      if (escaped && escaped.length % 2) return all;
      key = key.replace(/\\'/g, "'");
      if (plurals) {
        pluralVariable = key;
        var plural = plurals.split('|')[i];
        return escaped + plural.replace('@', "' + n + '");
      }
      return escaped + "' + (" + key + ") + '";
    });
  }
  
  var code = interpolate(0);
  
  if (pluralVariable) {
    // Build the rest of the plural forms.
    var forms = [ code ];
    for (var i = 1; i < this.pluralCount; i++) {
      forms[i] = interpolate(i);
    }
    
    var fn =
      'with (params) {' +
      'var n = (' + pluralVariable + ');' +
      'var _pluralIndex = (' + this.pluralFormula + ');' +
        forms.map(function(str, i) {
          return 'if (_pluralIndex === ' + i + ") return ('" + str + "');";
        }).join('') + 
      '}'
  }
  else {
    var fn = "with (params) return ('" + code + "');";
  }

  return new Function('params', fn);
};
