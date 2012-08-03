
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , assert = require('assert');

module.exports = {
  'test .capitalize()': function(){
    assert.equal('Hello there', lingo.capitalize('hello there'));
    assert.equal('Hello There', lingo.capitalize('hello there', true));
  },
  
  'test .camelcase()': function(){
    assert.equal('foo', lingo.camelcase('foo'));
    assert.equal('fooBar', lingo.camelcase('foo bar'));
    assert.equal('fooBarBaz', lingo.camelcase('foo bar baz'));
    assert.equal('base64Encode', lingo.camelcase('base  -! 64 encode'));
    assert.equal('UserRole', lingo.camelcase('user role', true));
  },
  
  'test .underscore()': function(){
    assert.equal('user', lingo.underscore('User'));
    assert.equal('user_account', lingo.underscore('UserAccount'))
  },
  
  'test .join()': function(){
    assert.equal('foo', lingo.join(['foo']));
    assert.equal('foo and bar', lingo.join(['foo', 'bar']));
    assert.equal('foo, bar and baz', lingo.join(['foo', 'bar', 'baz']));
    assert.equal('foo, bar or baz', lingo.join(['foo', 'bar', 'baz'], 'or'));
  },
  
  'test Language mapping': function(){
    assert.equal('en', lingo.en.code);
  }
}