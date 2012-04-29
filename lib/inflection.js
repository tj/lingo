
/*!
 * Lingo - inflection
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Language = require('./language');

/**
 * Check if a `word` is uncountable.
 *
 * @param {String} word
 * @return {Boolean}
 * @api public
 */

Language.prototype.isUncountable = function(word){
  return !!this.rules.uncountable[word];
};

/**
 * Add an uncountable `word`.
 *
 * @param {String} word
 * @return {Language} for chaining
 * @api public
 */

Language.prototype.uncountable = function(word){
  this.rules.uncountable[word] = word;
  return this;
};

/**
 * Add an irreglar `singular` / `plural` map.
 *
 * @param {String} singular
 * @param {String} plural
 * @return {Language} for chaining
 * @api public
 */

Language.prototype.irregular = function(singular, plural){
  this.rules.irregular.plural[singular] = plural;
  this.rules.irregular.singular[plural] = singular;
  return this;
};

/**
 * Add a pluralization `rule` for numbers
 *
 * @param {RegExp} rule
 * @return {Language} for chaining
 * @api public
 */

Language.prototype.pluralNumbers = function(rule){
  this.rules.pluralNumbers = rule;
  return this;
};

/**
 * Add a pluralization `rule` with the given `substitution`.
 *
 * @param {RegExp} rule
 * @param {String} substitution
 * @return {Language} for chaining
 * @api public
 */

Language.prototype.plural = function(rule, substitution){
  this.rules.plural.unshift([rule, substitution]);
  return this;
};

/**
 * Add a singularization `rule` with the given `substitution`.
 *
 * @param {RegExp} rule
 * @param {String} substitution
 * @return {Language} for chaining
 * @api public
 */

Language.prototype.singular = function(rule, substitution){
  this.rules.singular.unshift([rule, substitution]);
  return this;
};

/**
 * Pluralize the given `word`.
 *
 * @param {String} word
 * @return {String}
 * @api public
 */

Language.prototype.pluralize = function(word){
  return this.inflect(word, 'plural');
};

/**
 * Check if `word` is plural.
 *
 * @param {String or Number} word
 * @return {Boolean}
 * @api public
 */

Language.prototype.isPlural = function (word) {
  if ('number' == typeof word) {
      return (this.rules.pluralNumbers || /.*/).test(word);
  } else {
      return word == this.pluralize(this.singularize(word));
  }
};

/**
 * Singularize the given `word`.
 *
 * @param {String} word
 * @return {String}
 * @api public
 */

Language.prototype.singularize = function (word) {
  return this.inflect(word, 'singular');
};

/**
 * Check if `word` is singular.
 *
 * @param {String or Number} word
 * @return {Boolean}
 * @api public
 */

Language.prototype.isSingular = function (word) {
  return !this.isPlural(word);
};


/**
 * Tableize the given `str`.
 *
 * Examples:
 *
 *    lingo.tableize('UserAccount');
 *    // => "user_accounts"
 *  
 *    lingo.tableize('User');
 *    // => "users"
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

exports.tableize = function(str){
  var underscored = exports.underscore(word);
  return Language.pluralize(underscored);
};

/**
 * Perform `type` inflection rules on the given `word`.
 *
 * @param {String} word
 * @param {String} type
 * @return {String}
 * @api private
 */

Language.prototype.inflect = function(word, type) {
  if (this.isUncountable(word)) return word;

  var irregular = this.rules.irregular[type][word];
  if (irregular) return irregular;

  for (var i = 0, len = this.rules[type].length; i < len; ++i) {
    var rule = this.rules[type][i]
      , regexp = rule[0]
      , sub = rule[1];
    if (regexp.test(word)) {
      return word.replace(regexp, sub);
    }
  }

  return word;
}
