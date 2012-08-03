/**
 * Module dependencies.
 */

var lingo = require('./..')
  , assert = require('assert')
  , es = lingo.es;

module.exports = {
  'test .isUncountable()': function(){
    assert.equal(true, es.isUncountable('agua'));
    assert.equal(false, es.isUncountable('arbol'));
  },

  'test .pluralNumbers()': function(){
    delete es.rules.pluralNumbers;
    assert.equal(true, es.isPlural(1));
    es.pluralNumbers(/[^1]/);
    assert.equal(false, es.isPlural(1));
  },

  'test .pluralize()': function(){
    assert.equal('perros', es.pluralize('perro'));
    assert.equal('arboles', es.pluralize('arbol'));
    assert.equal('cojones', es.pluralize('cojón'));
    assert.equal('androides', es.pluralize('androide'));
  },

  'test .singularize()': function(){
    assert.equal('perro', es.singularize('perros'));
    assert.equal('árbol', es.singularize('árboles'));
    assert.equal('cojón', es.singularize('cojones'));
    assert.equal('androide', es.singularize('androides'));
  },

  'test .isPlural()': function(){
    assert.equal(true, es.isPlural('perros'));
    assert.equal(true, es.isPlural('árboles'));
    assert.equal(true, es.isPlural('cojones'));
    assert.equal(true, es.isPlural('androides'));
  },

  'test .isSingular()': function(){
    assert.equal(true, es.isSingular('perro'));
    assert.equal(true, es.isSingular('árbol'));
    assert.equal(true, es.isSingular('cojón'));
    assert.equal(true, es.isSingular('androide'));
  }
};

