
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , assert = require('assert')
  , en = lingo.en;

var fr = new lingo.Language('fr');

fr.translations = {
    'Hello World': 'Bonjour tout le monde'
  , 'Hello {name}': 'Bonjour {name}'
  , 'Hello {first} {last}': 'Bonjour {first} {last}'
};

module.exports = {
  'test .translate()': function(){
    assert.equal('Hello World', en.translate('Hello World'));
    assert.equal('Hello TJ', en.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('Hello foo bar', en.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  },
  
  'test .translate() with translations': function(){
    assert.equal('Bonjour tout le monde', fr.translate('Hello World'));
    assert.equal('Bonjour TJ', fr.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('Bonjour foo bar', fr.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  }
}