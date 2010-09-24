
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , inflection = lingo.inflection
  , singularize = inflection.singularize
  , pluralize = inflection.pluralize;

module.exports = {
  'test .uncountables': function(assert){
    assert.ok(inflection.uncountables);
  },
  
  'test .isUncountable()': function(assert){
    assert.equal(true, inflection.isUncountable('moose'));
    assert.equal(false, inflection.isUncountable('person'));
  },
  
  'test .uncountable()': function(assert){
    assert.equal(false, inflection.isUncountable('foobar'));
    inflection.uncountable('foobar');
    assert.equal(true, inflection.isUncountable('foobar'));
  },
  
  'test .pluralize()': function(assert){
    assert.equal('paper', pluralize('paper'));
    assert.equal('quizzes', pluralize('quiz'));
    assert.equal('things', pluralize('things'));
    assert.equal('things', pluralize('thing'));
    assert.equal('men', pluralize('man'));
  },
  
  'test .singularize()': function(assert){
    assert.equal('paper', singularize('paper'));
    assert.equal('shoe', singularize('shoes'));
    assert.equal('thing', singularize('things'));
    assert.equal('thing', singularize('thing'));
    assert.equal('man', singularize('men'));
  }
};