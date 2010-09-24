
/*!
 * Lingo - inflection
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Inflection rules.
 */

var rules = exports.rules = {
    plural: []
  , singular: []
  , uncountable: []
  , irregular: {}
};

/**
 * Check if a `word` is uncountable.
 *
 * @param {String} word
 * @return {Boolean}
 * @api public
 */

var isUncountable = exports.isUncountable = function(word){
  return !!~rules.uncountable.indexOf(word);
};

/**
 * Add an uncountable `word`.
 *
 * @param {String} word
 * @api public
 */

var uncountable = exports.uncountable = function(word){
  rules.uncountable.push(word);
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
  rules.plural.unshift([rule, substitution]);
};

/**
 * Add a singularization `rule` with the given `substitution`.
 *
 * @param {RegExp} rule
 * @param {String} substitution
 * @api public
 */

var singular = exports.singular = function(rule, substitution){
  rules.singular.unshift([rule, substitution]);
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

/**
 * Default pluralization rules.
 */

plural(/$/, "s");
plural(/s$/i, "s");
plural(/(ax|test)is$/i, "$1es");
plural(/(octop|vir)us$/i, "$1i");
plural(/(alias|status)$/i, "$1es");
plural(/(bu)s$/i, "$1ses");
plural(/(buffal|tomat)o$/i, "$1oes");
plural(/([ti])um$/i, "$1a");
plural(/sis$/i, "ses");
plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves");
plural(/(hive)$/i, "$1s");
plural(/([^aeiouy]|qu)y$/i, "$1ies");
plural(/(x|ch|ss|sh)$/i, "$1es");
plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices");
plural(/([m|l])ouse$/i, "$1ice");
plural(/^(ox)$/i, "$1en");
plural(/(quiz)$/i, "$1zes");

/**
 * Defaiult singularization rules.
 */

singular(/s$/i, "")
singular(/(n)ews$/i, "$1ews")
singular(/([ti])a$/i, "$1um")
singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
singular(/(^analy)ses$/i, "$1sis")
singular(/([^f])ves$/i, "$1fe")
singular(/(hive)s$/i, "$1")
singular(/(tive)s$/i, "$1")
singular(/([lr])ves$/i, "$1f")
singular(/([^aeiouy]|qu)ies$/i, "$1y")
singular(/(s)eries$/i, "$1eries")
singular(/(m)ovies$/i, "$1ovie")
singular(/(x|ch|ss|sh)es$/i, "$1")
singular(/([m|l])ice$/i, "$1ouse")
singular(/(bus)es$/i, "$1")
singular(/(o)es$/i, "$1")
singular(/(shoe)s$/i, "$1")
singular(/(cris|ax|test)es$/i, "$1is")
singular(/(octop|vir)i$/i, "$1us")
singular(/(alias|status)es$/i, "$1")
singular(/^(ox)en/i, "$1")
singular(/(vert|ind)ices$/i, "$1ex")
singular(/(matr)ices$/i, "$1ix")
singular(/(quiz)zes$/i, "$1")
singular(/(database)s$/i, "$1")

/**
 * Default irregular word mappings.
 */

irregular('person', 'people');
irregular('man', 'men');
irregular('child', 'children');
irregular('move', 'moves');
irregular('sex', 'sexes');

/**
 * Default uncountables.
 */

uncountable('advice');
uncountable('enegery');
uncountable('excretion');
uncountable('digestion');
uncountable('cooperation');
uncountable('health');
uncountable('justice');
uncountable('jeans');
uncountable('labour');
uncountable('machinery');
uncountable('equipment');
uncountable('information');
uncountable('pollution');
uncountable('sewage');
uncountable('paper');
uncountable('money');
uncountable('species');
uncountable('series');
uncountable('rain');
uncountable('rice');
uncountable('fish');
uncountable('sheep');
uncountable('moose');
uncountable('deer');
uncountable('bison');
uncountable('news');
