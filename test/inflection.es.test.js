/**
 * Module dependencies.
 */

var lingo = require('./..')
  , es = lingo.es;

module.exports = {
  'test .isUncountable()': function(beforeExit, assert) {
    assert.equal(true, es.isUncountable('agua'));
    assert.equal(false, es.isUncountable('arbol'));
  },

  'test .pluralNumbers()': function(beforeExit, assert) {
    delete es.rules.pluralNumbers;
    assert.equal(true, es.isPlural(1));
    es.pluralNumbers(/[^1]/);
    assert.equal(false, es.isPlural(1));
  },

  'test .pluralize()': function(beforeExit, assert) {
    assert.equal('perros', es.pluralize('perro'));
    assert.equal('arboles', es.pluralize('arbol'));
    assert.equal('cojones', es.pluralize('cojón'));
    assert.equal('androides', es.pluralize('androide'));
  },

  'test .singularize()': function(beforeExit, assert) {
    assert.equal('perro', es.singularize('perros'));
    assert.equal('árbol', es.singularize('árboles'));
    assert.equal('cojón', es.singularize('cojones'));
    assert.equal('androide', es.singularize('androides'));
  },

  'test .isPlural()': function(beforeExit, assert) {
    assert.equal(true, es.isPlural('perros'));
    assert.equal(true, es.isPlural('árboles'));
    assert.equal(true, es.isPlural('cojones'));
    assert.equal(true, es.isPlural('androides'));
  },

  'test .isSingular()': function(beforeExit, assert) {
    assert.equal(true, es.isSingular('perro'));
    assert.equal(true, es.isSingular('árbol'));
    assert.equal(true, es.isSingular('cojón'));
    assert.equal(true, es.isSingular('androide'));
  }
};

