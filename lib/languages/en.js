/*!
 * Lingo - languages - English
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Language = require('../language');

/**
 * English.
 */

var en = module.exports = new Language('en', 'English');

/**
 * Number pluraluzation rule
 */
en.pluralNumbers(/[^1]/);

/**
 * Default pluralization rules.
 */

en.plural(/$/, "s")
  .plural(/(s|ss|sh|ch|x|o)$/i, "$1es")
  .plural(/y$/i, "ies")
  .plural(/(o|e)y$/i, "$1ys")
  .plural(/(octop|vir)us$/i, "$1i")
  .plural(/(alias|status)$/i, "$1es")
  .plural(/(bu)s$/i, "$1ses")
  .plural(/([ti])um$/i, "$1a")
  .plural(/sis$/i, "ses")
  .plural(/(?:([^f])fe|([lr])f)$/i, "$1$2ves")
  .plural(/([^aeiouy]|qu)y$/i, "$1ies")
  .plural(/(matr|vert|ind)(?:ix|ex)$/i, "$1ices")
  .plural(/([m|l])ouse$/i, "$1ice")
  .plural(/^(ox)$/i, "$1en")
  .plural(/(quiz)$/i, "$1zes");

/**
 * Default singularization rules.
 */

en.singular(/s$/i, "")
  .singular(/(bu|mis|kis)s$/i, "$1s")
  .singular(/([ti])a$/i, "$1um")
  .singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1$2sis")
  .singular(/(^analy)ses$/i, "$1sis")
  .singular(/([^f])ves$/i, "$1fe")
  .singular(/([lr])ves$/i, "$1f")
  .singular(/ies$/i, "ie")
  .singular(/([^aeiouy]|qu)ies$/i, "$1y")
  .singular(/(series)$/i, "$1")
  .singular(/(mov)ies$/i, "$1ie")
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
  .singular(/(quiz)zes$/i, "$1");

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
  .irregular('sex', 'sexes')
  .irregular('video', 'videos')
  .irregular('rodeo', 'rodeos');

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
