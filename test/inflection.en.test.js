
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
  },
  
  'test .singularize()': function(assert){
    assert.equal('paper', en.singularize('paper'));
    assert.equal('shoe', en.singularize('shoes'));
    assert.equal('thing', en.singularize('things'));
    assert.equal('thing', en.singularize('thing'));
    assert.equal('man', en.singularize('men'));
    assert.equal('man', en.singularize('men'));
    assert.equal('parenthesi', en.singularize('parenthesis'));
  }
};