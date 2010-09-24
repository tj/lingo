
/**
 * Module dependencies.
 */

var lingo = require('lingo');

module.exports = {
  'test .version': function(assert){
    assert.match(lingo.version, /^\d+\.\d+\.\d+$/);
  },
  
  'test .uncountables': function(assert){
    assert.ok(lingo.uncountables);
  },
  
  'test .uncountable()': function(assert){
    assert.equal(true, lingo.uncountable('moose'));
    assert.equal(false, lingo.uncountable('person'));
  }
}