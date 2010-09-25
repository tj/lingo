
/*!
 * Lingo - inflection
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Initialize a new `Language` with the given `lang`.
 *
 * @param {String} lang
 * @api public
 */

var Language = exports.Language = function Language(lang) {
  this.lang = lang;
  this.rules = {
      plural: []
    , singular: []
    , uncountable: {}
    , irregular: {}
  };
};

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
  this.rules.irregular[singular] = plural;
  this.rules.irregular[plural] = singular;
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
 * Singularize the given `word`.
 *
 * @param {String} word
 * @return {String}
 * @api public
 */

Language.prototype.singularize = function(word){
  return this.inflect(word, 'singular');
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

  var irregular = this.rules.irregular[word];
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

/**
 * English.
 */

var en = exports.en = new Language('en');

/**
 * Default pluralization rules.
 */

en.plural(/$/, "s");
en.plural(/s$/i, "s");
en.plural(/(ax|test)is$/i, "$1es");
en.plural(/(octop|vir)us$/i, "$1i");
en.plural(/(alias|status)$/i, "$1es");
en.plural(/(bu)s$/i, "$1ses");
en.plural(/(buffal|tomat)o$/i, "$1oes");
en.plural(/([ti])um$/i, "$1a");
en.plural(/sis$/i, "ses");
en.plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
en.plural(/(hive)$/i, "$1s");
en.plural(/([^aeiouy]|qu)y$/i, "$1ies");
en.plural(/(x|ch|ss|sh)$/i, "$1es");
en.plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices");
en.plural(/([m|l])ouse$/i, "$1ice");
en.plural(/^(ox)$/i, "$1en");
en.plural(/(quiz)$/i, "$1zes");

/**
 * Defaiult singularization rules.
 */

en.singular(/s$/i, "")
en.singular(/(n)ews$/i, "$1ews")
en.singular(/([ti])a$/i, "$1um")
en.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
en.singular(/(^analy)ses$/i, "$1sis")
en.singular(/([^f])ves$/i, "$1fe")
en.singular(/(hive)s$/i, "$1")
en.singular(/(tive)s$/i, "$1")
en.singular(/([lr])ves$/i, "$1f")
en.singular(/([^aeiouy]|qu)ies$/i, "$1y")
en.singular(/(s)eries$/i, "$1eries")
en.singular(/(m)ovies$/i, "$1ovie")
en.singular(/(x|ch|ss|sh)es$/i, "$1")
en.singular(/([m|l])ice$/i, "$1ouse")
en.singular(/(bus)es$/i, "$1")
en.singular(/(o)es$/i, "$1")
en.singular(/(shoe)s$/i, "$1")
en.singular(/(cris|ax|test)es$/i, "$1is")
en.singular(/(octop|vir)i$/i, "$1us")
en.singular(/(alias|status)es$/i, "$1")
en.singular(/^(ox)en/i, "$1")
en.singular(/(vert|ind)ices$/i, "$1ex")
en.singular(/(matr)ices$/i, "$1ix")
en.singular(/(quiz)zes$/i, "$1")
en.singular(/(database)s$/i, "$1")

/**
 * Default irregular word mappings.
 */

en.irregular('person', 'people');
en.irregular('man', 'men');
en.irregular('child', 'children');
en.irregular('move', 'moves');
en.irregular('sex', 'sexes');

/**
 * Default uncountables.
 */

en.uncountable('advice');
en.uncountable('enegery');
en.uncountable('excretion');
en.uncountable('digestion');
en.uncountable('cooperation');
en.uncountable('health');
en.uncountable('justice');
en.uncountable('jeans');
en.uncountable('labour');
en.uncountable('machinery');
en.uncountable('equipment');
en.uncountable('information');
en.uncountable('pollution');
en.uncountable('sewage');
en.uncountable('paper');
en.uncountable('money');
en.uncountable('species');
en.uncountable('series');
en.uncountable('rain');
en.uncountable('rice');
en.uncountable('fish');
en.uncountable('sheep');
en.uncountable('moose');
en.uncountable('deer');
en.uncountable('bison');
en.uncountable('news');
