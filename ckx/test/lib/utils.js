import { notEmpty } from '/lib/utils'
import { assert } from 'chai'

describe('notEmpty', () => {
  it('should be false for empty objects', () => {
    assert.equal(notEmpty({}), false)
    assert.equal(notEmpty(undefined), false)
    assert.equal(notEmpty(null), false)
  })
  it('should be false for objects with only empty values', () => {
    assert.equal(notEmpty({age: '', name: null, year: undefined, person: ''}), false)
    assert.equal(notEmpty({age: ''}), false)
  })
  it('should be true for objects with at least one non-empty value', () => {
    assert.equal(notEmpty({age: '', name: null, year: 1999, person: ''}), false)
    assert.equal(notEmpty({age: '', name: null, year: '1999', person: ''}), false)
    assert.equal(notEmpty({age: '', name: null, year: {doc: 1}, person: ''}), false)
    assert.equal(notEmpty({age: '1', empty: ''}), false)
    assert.equal(notEmpty({empty: '', age: '1'}), false)
  })
  it('should treat empty objects in the value position as false', () => {
    assert.equal(notEmpty({doc: {}}), true)
  })
})
