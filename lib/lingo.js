
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
 * Inflection API.
 *
 * @type Object
 */

exports.inflection = require('./inflection');

/**
 * Capitalize the first word of `str` or optionally `allWords`.
 *
 * @param {String} str
 * @param {Boolean} allWords
 * @return {String}
 * @api public
 */

exports.capitalize = function(str, allWords){
  if (allWords) {
    return str.split(' ').map(function(word){
      return exports.capitalize(word);
    }).join(' ');
  }
  return str.charAt(0).toUpperCase() + str.substr(1);
};

/**
 * Camel-case the given `str`.
 *
 * Examples:
 *
 *    lingo.camelcase('foo bar');
 *    // => "fooBar"
 *  
 *    lingo.camelcase('foo bar baz', true);
 *    // => "FooBarBaz"
 *
 * @param {String} str
 * @param {Boolean} uppercaseFirst
 * @return {String}
 * @api public
 */

exports.camelcase = function(str, uppercaseFirst){
  return str.replace(/[^\w\d ]+/g, '').split(' ').map(function(word, i){
    if (i || (0 == i && uppercaseFirst)) {
      word = exports.capitalize(word);
    }
    return word;
  }).join('');
};