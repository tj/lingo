
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

en.plural(/$/, "s")
  .plural(/s$/i, "s")
  .plural(/(ax|test)is$/i, "$1es")
  .plural(/(octop|vir)us$/i, "$1i")
  .plural(/(alias|status)$/i, "$1es")
  .plural(/(bu)s$/i, "$1ses")
  .plural(/(buffal|tomat)o$/i, "$1oes")
  .plural(/([ti])um$/i, "$1a")
  .plural(/sis$/i, "ses")
  .plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves")
  .plural(/(hive)$/i, "$1s")
  .plural(/([^aeiouy]|qu)y$/i, "$1ies")
  .plural(/(x|ch|ss|sh)$/i, "$1es")
  .plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices")
  .plural(/([m|l])ouse$/i, "$1ice")
  .plural(/^(ox)$/i, "$1en")
  .plural(/(quiz)$/i, "$1zes");

/**
 * Defaiult singularization rules.
 */

en.singular(/s$/i, "")
  .singular(/(n)ews$/i, "$1ews")
  .singular(/([ti])a$/i, "$1um")
  .singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
  .singular(/(^analy)ses$/i, "$1sis")
  .singular(/([^f])ves$/i, "$1fe")
  .singular(/(hive)s$/i, "$1")
  .singular(/(tive)s$/i, "$1")
  .singular(/([lr])ves$/i, "$1f")
  .singular(/([^aeiouy]|qu)ies$/i, "$1y")
  .singular(/(s)eries$/i, "$1eries")
  .singular(/(m)ovies$/i, "$1ovie")
  .singular(/(x|ch|ss|sh)es$/i, "$1")
  .singular(/([m|l])ice$/i, "$1ouse")
  .singular(/(bus)es$/i, "$1")
  .singular(/(o)es$/i, "$1")
  .singular(/(shoe)s$/i, "$1")
  .singular(/(cris|ax|test)es$/i, "$1is")
  .singular(/(octop|vir)i$/i, "$1us")
  .singular(/(alias|status)es$/i, "$1")
  .singular(/^(ox)en/i, "$1")
  .singular(/(vert|ind)ices$/i, "$1ex")
  .singular(/(matr)ices$/i, "$1ix")
  .singular(/(quiz)zes$/i, "$1")
  .singular(/(database)s$/i, "$1");

/**
 * Default irregular word mappings.
 */

en.irregular('i', 'we')
  .irregular('person', 'people')
  .irregular('man', 'men')
  .irregular('child', 'children')
  .irregular('move', 'moves')
  .irregular('she', 'they')
  .irregular('he', 'they')
  .irregular('myself', 'ourselves')
  .irregular('yourself', 'ourselves')
  .irregular('himself', 'themselves')
  .irregular('herself', 'themselves')
  .irregular('themself', 'themselves')
  .irregular('mine', 'ours')
  .irregular('hers', 'theirs')
  .irregular('his', 'theirs')
  .irregular('its', 'theirs')
  .irregular('theirs', 'theirs')
  .irregular('sex', 'sexes');

/**
 * Default uncountables.
 */

en.uncountable('advice')
  .uncountable('enegery')
  .uncountable('excretion')
  .uncountable('digestion')
  .uncountable('cooperation')
  .uncountable('health')
  .uncountable('justice')
  .uncountable('jeans')
  .uncountable('labour')
  .uncountable('machinery')
  .uncountable('equipment')
  .uncountable('information')
  .uncountable('pollution')
  .uncountable('sewage')
  .uncountable('paper')
  .uncountable('money')
  .uncountable('species')
  .uncountable('series')
  .uncountable('rain')
  .uncountable('rice')
  .uncountable('fish')
  .uncountable('sheep')
  .uncountable('moose')
  .uncountable('deer')
  .uncountable('bison')
  .uncountable('proceedings')
  .uncountable('shears')
  .uncountable('pincers')
  .uncountable('breeches')
  .uncountable('hijinks')
  .uncountable('clippers')
  .uncountable('chassis')
  .uncountable('innings')
  .uncountable('elk')
  .uncountable('rhinoceros')
  .uncountable('swine')
  .uncountable('you')
  .uncountable('news');
