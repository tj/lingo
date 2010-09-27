
/*!
 * Lingo - Language
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Initialize a new `Language` with the given `code`.
 *
 * @param {String} code
 * @api public
 */

var Language = module.exports = function Language(code) {
  this.code = code;
  this.rules = {
      plural: []
    , singular: []
    , uncountable: {}
    , irregular: { plural: {}, singular: {}}
  };
  Language[code] = this;
};