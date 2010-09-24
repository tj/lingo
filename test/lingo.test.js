
/**
 * Module dependencies.
 */

var lingo = require('lingo');

module.exports = {
  'test .version': function(assert){
    assert.match(lingo.version, /^\d+\.\d+\.\d+$/);
  }
}