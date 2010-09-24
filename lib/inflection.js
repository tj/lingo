
/*!
 * Lingo - inflection
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var uncountables = require('./uncountables');

/**
 * Inflection rules.
 */

var rules = exports.rules = {};
rules.plural = [];
rules.singular = [];
rules.irregular = {};

/**
 * Uncountable words.
 * 
 * @type Array
 */

exports.uncountables = require('./uncountables');

/**
 * Check if a `word` is uncountable.
 *
 * @param {String} word
 * @return {Boolean}
 * @api public
 */

var isUncountable = exports.isUncountable = function(word){
  return !!~exports.uncountables.indexOf(word);
};

/**
 * Add an uncountable `word`.
 *
 * @param {String} word
 * @api public
 */

exports.uncountable = function(word){
  exports.uncountables.push(word);
};

/**
 * Add an irreglar `singular` / `plural` map.
 *
 * @param {String} singular
 * @param {String} plural
 * @api public
 */

var irregular = exports.irregular = function(singular, plural){
  rules.irregular[singular] = plural;
  rules.irregular[plural] = singular;
};

/**
 * Add a pluralization `rule` with the given `substitution`.
 *
 * @param {RegExp} rule
 * @param {String} substitution
 * @api public
 */

var plural = exports.plural = function(rule, substitution){
  rules.plural.push([rule, substitution]);
};

/**
 * Add a singularization `rule` with the given `substitution`.
 *
 * @param {RegExp} rule
 * @param {String} substitution
 * @api public
 */

var singular = exports.singular = function(rule, substitution){
  rules.singular.push([rule, substitution]);
};

/**
 * Pluralize the given `word`.
 *
 * @param {String} word
 * @return {String}
 * @api public
 */

exports.pluralize = function(word){
  return inflect(word, 'plural');
};

/**
 * Singularize the given `word`.
 *
 * @param {String} word
 * @return {String}
 * @api public
 */

exports.singularize = function(word){
  return inflect(word, 'singular');
};

/**
 * Perform `type` inflection rules on the given `word`.
 *
 * @param {String} word
 * @param {String} type
 * @return {String}
 * @api private
 */

function inflect(word, type) {
  if (isUncountable(word)) return word;

  var irregular = rules.irregular[word];
  if (irregular) return irregular;

  for (var i = 0, len = rules[type].length; i < len; ++i) {
    var rule = rules[type][i]
      , regexp = rule[0]
      , sub = rule[1];
    if (regexp.test(word)) {
      return word.replace(regexp, sub);
    }
  }

  return word;
}

// Defaults

plural(/(quiz)$/i, '$1zes');
plural(/s$/i, 's');
plural(/$/i, 's');

singular(/(cris|ax|test)es$/i, '$1is');
singular(/(shoe)s$/i, '$1');
singular(/s$/i, '');

irregular('person', 'people');
irregular('man', 'men');
irregular('child', 'children');
irregular('move', 'moves');
irregular('sex', 'sexes');
