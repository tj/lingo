
/*!
 * Lingo - Language
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Initialize a new `Language` with the given `lang`.
 *
 * @param {String} lang
 * @api public
 */

var Language = module.exports = function Language(lang) {
  this.lang = lang;
  this.rules = {
      plural: []
    , singular: []
    , uncountable: {}
    , irregular: { plural: {}, singular: {}}
  };
};