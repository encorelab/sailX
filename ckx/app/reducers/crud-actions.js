// automatically generated dict of actions with a given prefix,
// for example actions('Observation') will give a dict with functions like addObservation(doc),
// which applies to the collection 'OBSERVATIONS' and can be auto-attached in the connect statement
export default (suffix) => {
  const path = suffix.toUpperCase() + 'S'
  return {
    [`add${suffix}`]: (doc) => ({
      type: `add/${path}`,
      doc: doc
    }),
    [`edit${suffix}`]: (doc) => ({
      type: `edit/${path}`,
      doc: doc
    }),
    [`delete${suffix}`]: (id) => ({
      type: `delete/${path}`,
      id: id
    }),
    [`deleteAll${suffix}`]: () => ({
      type: `deleteAll/${path}`
    })
  }
}

