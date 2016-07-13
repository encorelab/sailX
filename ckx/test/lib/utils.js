import { notEmpty } from '/lib/utils'
import { assert, should } from 'chai'

should() // needs to be run before using should-style assertions

describe('notEmpty', () => {
  it('should be false for empty objects', () => {
    assert.equal(notEmpty({}), false)
    assert.equal(notEmpty(undefined), false)
    assert.equal(notEmpty(null), false)
  })
  it('should be false for objects with only empty values', () => {
    notEmpty({age: '', name: null, year: undefined, person: ''}).should.equal(false)
    notEmpty({age: ''}).should.equal(false)
  })
  it('should be true for objects with at least one non-empty value', () => {
    assert.equal(notEmpty({age: '', name: null, year: 1999, person: ''}), true)
    assert.equal(notEmpty({age: '', name: null, year: '1999', person: ''}), true)
    assert.equal(notEmpty({age: '', name: null, year: {doc: 1}, person: ''}), true)
    assert.equal(notEmpty({age: '1', empty: ''}), true)
    assert.equal(notEmpty({empty: '', age: '1'}), true)
  })
  it('should treat empty objects in the value position as false', () => {
    assert.equal(notEmpty({doc: {}}), true)
  })
})
