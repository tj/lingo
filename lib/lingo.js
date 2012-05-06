
/*!
 * Lingo
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs');

/**
 * Library version.
 * 
 * @type String
 */

exports.version = '0.0.4';

/**
 * Expose `Language`.
 *
 * @type Function
 */

exports.Language = require('./language');

/**
 * Extend `Language` with inflection rules.
 */

require('./inflection');

/**
 * Auto-require languages.
 */

require('./languages/en');
require('./languages/es');

/**
 * Capitalize the first word of `str` or optionally `allWords`.
 *
 * Examples:
 *
 *    lingo.capitalize('hello there');
 *    // => "Hello there"
 *
 *    lingo.capitalize('hello there', true);
 *    // => "Hello There"
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
 * Check if the first letter of `str` is capitalized, or optionally `allWords`
 *
 * Examples:
 *
 *    lingo.isCapitalized('Hello');
 *    // => true
 *
 *    lingo.isCapitalized('Hello there', true);
 *    // => false
 *
 * @param {String} str
 * @param {Boolean} allWords
 * @return {Boolean}
 * @api public
 */

exports.isCapitalized = function(str, allWords){
  if (allWords) {
    return str.split(' ').every(function(word){
      return exports.isCapitalized(word);
    });
  }
  if( str.length === 1 )
    return str.charAt(0).toUpperCase() === str.charAt(0);
  return str.charAt(0).toUpperCase() === str.charAt(0) && str.charAt(1).toUpperCase() !== str.charAt(1);
};

/**
 * Check if `str` is uppercase
 *
 * Examples:
 *
 *    lingo.isUpperCase('foo');
 *    // => "FOO"
 *
 * @param {String} str
 * @return {Boolean}
 * @api public
 */

exports.isUpperCase = function(str){
  return str.toUpperCase() === str;
};

/**
 * Underscore the given `str`.
 *
 * Examples:
 *
 *    lingo.underscore('UserAccount');
 *    // => "user_account"
 *  
 *    lingo.underscore('User');
 *    // => "user"
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

exports.underscore = function(str){
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
};

/**
 * Join an array with the given `last` string
 * which defaults to "and".
 *
 * Examples:
 *
 *    lingo.join(['fruits', 'veggies', 'sugar']);
 *    // => "fruits, veggies and sugar"
 *
 *    lingo.join(['fruits', 'veggies', 'sugar'], 'or');
 *    // => "fruits, veggies or sugar"
 *
 * @param {Array} arr
 * @param {String} last
 * @return {String}
 * @api public
 */

exports.join = function(arr, last){
  var str = arr.pop()
    , last = last || 'and';
  if (arr.length) {
    str = arr.join(', ') + ' ' + last + ' ' + str;
  }
  return str;
};
