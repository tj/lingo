
/*!
 * Lingo
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Library version.
 * 
 * @type String
 */

exports.version = '0.0.1'

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

exports.uncountable = function(word){
  return !!~exports.uncountables.indexOf(word);
};