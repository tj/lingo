
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , en = lingo.inflection.en;

module.exports = {
  'test .isUncountable()': function(assert){
    assert.equal(true, en.isUncountable('moose'));
    assert.equal(false, en.isUncountable('person'));
  },
  
  'test .uncountable()': function(assert){
    delete en.rules.uncountable.foobar;
    assert.equal(false, en.isUncountable('foobar'));
    en.uncountable('foobar');
    assert.equal(true, en.isUncountable('foobar'));
  },
  
  'test .pluralize()': function(assert){
    assert.equal('paper', en.pluralize('paper'));
    assert.equal('quizzes', en.pluralize('quiz'));
    assert.equal('things', en.pluralize('things'));
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
    assert.equal('yours', en.pluralize('yours'));
    assert.equal('theirs', en.pluralize('hers'));
    assert.equal('theirs', en.pluralize('his'));
    assert.equal('theirs', en.pluralize('its'));
    assert.equal('theirs', en.pluralize('theirs'));
  },
  
  'test .singularize()': function(assert){
    assert.equal('paper', en.singularize('paper'));
    assert.equal('shoe', en.singularize('shoes'));
    assert.equal('thing', en.singularize('things'));
    assert.equal('thing', en.singularize('thing'));
    assert.equal('man', en.singularize('men'));
    assert.equal('man', en.singularize('men'));
    assert.equal('parenthesi', en.singularize('parenthesis'));
    assert.equal('i', en.singularize('we'));
    assert.equal('you', en.singularize('you'));
    assert.equal('themself', en.singularize('themselves'));
    assert.equal('theirs', en.singularize('theirs'));
  }
};