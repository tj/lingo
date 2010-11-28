/*!
 * Lingo - languages - Spanish
 * Copyright(c) 2010 Pau Ramon <masylum@gmail.com>
 * Based on Bermi's Python inflector http://github.com/bermi/Python-Inflector
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Language = require('../language');

/**
 * English.
 */

var es = module.exports = new Language('es', 'Español');

/**
 * Number pluraluzation rule
 */
es.pluralNumbers(/[^1]/);

/**
 * Default pluralization rules.
 */

es.plural(/$/, "es")
  .plural(/(ng|[wckgtp])$/i, "$1s")
  .plural(/([íú])$/i, "$1es")
  .plural(/z$/i, "ces")
  .plural(/([éí])(s)$/i, "$1$2es")
  .plural(/([aeiou])s$/i, "$1s")
  .plural(/([aeiouáéó])$/i, "$1s")
  .plural(/(^[bcdfghjklmnñpqrstvwxyz]*)([aeiou])([ns])$/i, "$1$2$3es")
  .plural(/([áéíóú])s$/i, "$1ses")
  .plural(/(^[bcdfghjklmnñpqrstvwxyz]*)an$/i, "$1anes")
  .plural(/([á])([ns])$/i, "a$2es")
  .plural(/([é])([ns])$/i, "e$2es")
  .plural(/([í])([ns])$/i, "i$2es")
  .plural(/([ó])([ns])$/i, "o$2es")
  .plural(/([ú])([ns])$/i, "u$2es")
  .plural(/([aeiou])x$/i, "$1x");

/**
 * Default singularization rules.
 */

es.singular(/es$/i, "")
  .singular(/([ghñpv]e)s$/i, "$1")
  .singular(/([bcdfghjklmnñprstvwxyz]{2,}e)s$/i, "$1")
  .singular(/([^e])s$/i, "$1")
  .singular(/(é)s$/i, "$1")
  .singular(/(sis|tis|xis)+$/i, "$1")
  .singular(/(ces)$/i, "z")
  .singular(/oides$/i, "oide")
  .singular(/([a])([ns])es$/i, "á$2")
  .singular(/([e])([ns])es$/i, "é$2")
  .singular(/([i])([ns])es$/i, "í$2")
  .singular(/([o])([ns])es$/i, "ó$2")
  .singular(/([u])([ns])es$/i, "ú$2")
  .singular(/^([bcdfghjklmnñpqrstvwxyz]*)([aeiou])([ns])es$/i, "$1$2$3");

/**
 * Default irregular word mappings.
 */

es.irregular('país', 'países')
  .irregular('champú', 'champús')
  .irregular('jersey', 'jerséis')
  .irregular('carácter', 'caracteres')
  .irregular('espécimen', 'especímenes')
  .irregular('menú', 'menús')
  .irregular('régimen', 'regímenes')
  .irregular('curriculum', 'currículos')
  .irregular('ultimátum', 'ultimatos')
  .irregular('memorándum', 'memorandos')
  .irregular('referéndum', 'referendos')

/**
 * Default uncountables.
 */

es.uncountable('tijeras')
  .uncountable('gafas')
  .uncountable('agua')
  .uncountable('vacaciones')
  .uncountable('víveres')
  .uncountable('déficit')

