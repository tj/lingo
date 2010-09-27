
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

Language.prototype.translate = function(str, params){
  str = this.translations[str] || str;
  if (params) {
    str = str.replace(/\{([^}]+)\}/g, function(_, key){
      return params[key];
    });
  }
  return str;
};
