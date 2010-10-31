
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , en = lingo.en;

var fr = new lingo.Language('fr');

fr.pluralCount = 2;
fr.pluralFormula = 'n > 1 ? 1 : 0';
fr.translations = {
    'Hello World': 'Bonjour tout le monde'
  , 'Hello {name}': 'Bonjour {name}'
  , 'Hello {first} {last}': 'Bonjour {first} {last}'
  , 'There {number:is 1 apple|are @ apples} on the table':
        'Il y a {number:@ pomme|@ pommes} sur la table'
  , '{comments:1 comment|@ comments} since {ago}':
        '{comments:@ commentaire|@ commentaires} depuis {ago}'
};

module.exports = {
  'test .translate()': function(assert){
    assert.equal('Hello World', en.translate('Hello World'));
    assert.equal('Hello TJ', en.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('Hello foo bar', en.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  },
  
  'test .translate() with translations': function(assert){
    assert.equal('Bonjour tout le monde', fr.translate('Hello World'));
    assert.equal('Bonjour TJ', fr.translate('Hello {name}', { name: 'TJ' }));
    assert.equal('Bonjour foo bar', fr.translate('Hello {first} {last}', { first: 'foo', last: 'bar' }));
  },
  
  'test .translatePlural()': function(assert) {
    assert.equal(
      'There are 4 apples on the table',
      en.translatePlural('There {number:is 1 apple|are @ apples} on the table', { number: 4 })
    );
    assert.equal(
      'There is 1 apple on the table',
      en.translatePlural('There {number:is 1 apple|are @ apples} on the table', { number: 1 })
    );
    assert.equal(
      'Il y a 4 pommes sur la table',
      fr.translatePlural('There {number:is 1 apple|are @ apples} on the table', { number: 4 })
    );
    assert.equal(
      'Il y a 1 pomme sur la table',
      fr.translatePlural('There {number:is 1 apple|are @ apples} on the table', { number: 1 })
    );
  },
  
  'test .translatePlural() with interpolation': function(assert) {
    assert.equal(
      '27 comments since yesterday',
      en.translatePlural('{comments:1 comment|@ comments} since {ago}', { comments: 27, ago: 'yesterday' })
    );
    assert.equal(
      '1 comment since yesterday',
      en.translatePlural('{comments:1 comment|@ comments} since {ago}', { comments: 1, ago: 'yesterday' })
    );
    assert.equal(
      '27 commentaires depuis hier',
      fr.translatePlural('{comments:1 comment|@ comments} since {ago}', { comments: 27, ago: 'hier' })
    );
    assert.equal(
      '1 commentaire depuis hier',
      fr.translatePlural('{comments:1 comment|@ comments} since {ago}', { comments: 1, ago: 'hier' })
    );
  }
}