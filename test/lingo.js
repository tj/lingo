
var lingo = require('lingo')
  , assert = require('component-assert')
  , en = lingo.en
  , es = lingo.es;

var fr = new lingo.Language('fr');

fr.translations = {
    'Hello World': 'Bonjour tout le monde'
  , 'Hello {name}': 'Bonjour {name}'
  , 'Hello {first} {last}': 'Bonjour {first} {last}'
};

describe('.capitalize()', function(){
  it('should return the string capitalized', function(){
    assert('Hello there' == lingo.capitalize('hello there'));
    assert('Hello There' == lingo.capitalize('hello there', true));
  })
})

describe('.pluralize()', function(){
  it('should return the string in plural', function(){
    assert('friends' == en.pluralize('friend'));
    assert('cojones' == es.pluralize('cojón'));
  })
})

describe('.translate()', function(){
  it('should return the string translated', function(){
    assert('Hello foo bar' == en.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
    assert('Bonjour TJ' == fr.translate('Hello {name}', { name: 'TJ' }));
  })
})
