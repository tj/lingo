
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , lang = lingo.Language.en
  , t = lingo.translate;

var alien = new lingo.Language('alien');

alien.translations = {
    'Hello World': 'woof rawr'
  , 'Hello {name}': '{name} rawr'
  , 'Hello {first} {last}': '{first} {last} rawr'
};

module.exports = {
  'test lingo.translate()': function(assert){
    assert.equal('Hello TJ', t('Hello {name}', { name: 'TJ' }));
    lingo.localize('alien');
    assert.equal('TJ rawr', t('Hello {name}', { name: 'TJ' }));
    lingo.localize('en');
  },

  'test .translate()': function(assert){
    assert.equal('Hello World', lang.translate('Hello World'));
    assert.equal('Hello TJ', lang.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('Hello foo bar', lang.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  },
  
  'test .translate() with translations': function(assert){
    var lang = alien;
    assert.equal('woof rawr', lang.translate('Hello World'));
    assert.equal('TJ rawr', lang.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('foo bar rawr', lang.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  }
}