
/**
 * Module dependencies.
 */

var lingo = require('./..')
  , assert = require('assert')
  , en = lingo.en;

module.exports = {
  'test .name': function(){
    assert.equal('English', en.name);
  },

  'test .isUncountable()': function(){
    assert.equal(true, en.isUncountable('moose'));
    assert.equal(false, en.isUncountable('person'));
  },
  
  'test .uncountable()': function(){
    delete en.rules.uncountable.foobar;
    assert.equal(false, en.isUncountable('foobar'));
    en.uncountable('foobar');
    assert.equal(true, en.isUncountable('foobar'));
  },

  'test .pluralNumbers()': function(){
    delete en.rules.pluralNumbers;
    assert.equal(true, en.isPlural(1));
    en.pluralNumbers(/[^1]/);
    assert.equal(false, en.isPlural(1));
  },

  'test .pluralize()': function(){
    assert.equal('ids', en.pluralize('id'));
    assert.equal('friends', en.pluralize('friend'));
    assert.equal('buses', en.pluralize('bus'));
    assert.equal('misses', en.pluralize('miss'));
    assert.equal('wishes', en.pluralize('wish'));
    assert.equal('watches', en.pluralize('watch'));
    assert.equal('foxes', en.pluralize('fox'));
    assert.equal('potatoes', en.pluralize('potato'));
    assert.equal('parties', en.pluralize('party'));
    assert.equal('paper', en.pluralize('paper'));
    assert.equal('quizzes', en.pluralize('quiz'));
    assert.equal('things', en.pluralize('thing'));
    assert.equal('men', en.pluralize('man'));
    assert.equal('kisses', en.pluralize('kiss'));
    assert.equal('dishes', en.pluralize('dish'));
    assert.equal('judges', en.pluralize('judge'));
    assert.equal('massages', en.pluralize('massage'));
    assert.equal('we', en.pluralize('i'));
    assert.equal('you', en.pluralize('you'));
    assert.equal('they', en.pluralize('she'));
    assert.equal('they', en.pluralize('he'));
    assert.equal('ourselves', en.pluralize('myself'));
    assert.equal('ourselves', en.pluralize('yourself'));
    assert.equal('themselves', en.pluralize('themself'));
    assert.equal('themselves', en.pluralize('herself'));
    assert.equal('themselves', en.pluralize('himself'));
    assert.equal('themselves', en.pluralize('themself'));
    assert.equal('ours', en.pluralize('mine'));
    assert.equal('theirs', en.pluralize('hers'));
    assert.equal('theirs', en.pluralize('his'));
    assert.equal('theirs', en.pluralize('its'));
    assert.equal('theirs', en.pluralize('theirs'));
    assert.equal('monkeys', en.pluralize('monkey'));
    assert.equal('keys', en.pluralize('key'));
    assert.equal('dogs', en.pluralize('dog'));
    assert.equal('boys', en.pluralize('boy'));
    assert.equal('oxen', en.pluralize('ox'));
    assert.equal('indices', en.pluralize('index'));
    assert.equal('indices', en.pluralize('indice'));
    assert.equal('categories', en.pluralize('category'));
  },
  
  'test .singularize()': function(){
    assert.equal('paper', en.singularize('paper'));
    assert.equal('ox', en.singularize('oxen'));
    assert.equal('shoe', en.singularize('shoes'));
    assert.equal('thing', en.singularize('things'));
    assert.equal('thing', en.singularize('thing'));
    assert.equal('man', en.singularize('men'));
    assert.equal('parenthesi', en.singularize('parenthesis'));
    assert.equal('i', en.singularize('we'));
    assert.equal('you', en.singularize('you'));
    assert.equal('themself', en.singularize('themselves'));
    assert.equal('theirs', en.singularize('theirs'));
    assert.equal('bus', en.singularize('bus'));
    assert.equal('miss', en.singularize('miss'));
    assert.equal('kiss', en.singularize('kiss'));
    assert.equal('man', en.singularize('man'));
    assert.equal('monkey', en.singularize('monkeys'));
    assert.equal('key', en.singularize('keys'));
    assert.equal('boy', en.singularize('boys'));
    assert.equal('movie', en.singularize('movies'));
    assert.equal('series', en.singularize('series'));
    assert.equal('index', en.singularize('indices'));
    assert.equal('category', en.singularize('categories'));
    assert.equal('series', en.singularize('series'));
  },
  
  'test .isPlural()': function(){
    assert.equal(true, en.isPlural('dogs'));
    assert.equal(true, en.isPlural('monkies'));
    assert.equal(true, en.isPlural('foxes'));
    assert.equal(false, en.isPlural('key'));
    assert.equal(false, en.isPlural('fox'));
  },
  
  'test .isSingular()': function(){
    assert.equal(true, en.isSingular('fox'));
    assert.equal(true, en.isSingular('person'));
    assert.equal(true, en.isSingular('dog'));
    assert.equal(false, en.isSingular('keys'));
    assert.equal(false, en.isSingular('foxes'));
  }
};
