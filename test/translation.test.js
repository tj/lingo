
/**
 * Module dependencies.
 */

var lingo = require('lingo')
  , t = lingo.Language.en.translate;

module.exports = {
  'test .translate()': function(assert){
    assert.equal('Hello World', t('Hello World'));
    assert.equal('Hello TJ', t('Hello {name}', { name: 'TJ' }));
  }
}