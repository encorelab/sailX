import { omit } from 'lodash'

const procDbDiff = (state, diffs) => {
  const allChanged = diffs.new.concat(diffs.updated)
  const allChangedIds = allChanged.map(e => e.id).concat(diffs.deletedIds)
  const stateWithoutChanged = state.filter(e => allChangedIds.indexOf(e.id) == -1)
  return [...stateWithoutChanged, ...allChanged]
}

const procDbDiffKV = (state, diffs) => {
    const toDel = diffs.deletedIds.map(e => JSON.parse(e).key)
    const updated = diffs.new.concat(diffs.updated)
    const toAdd = updated.reduce((acc, val) => ({...acc, [val.key]: val.value}), {})
    const added = {...state, ...toAdd}
    return omit(added, toDel)
}

// HOF which returns reducer that first checks if it is a dbupdate, and if not, passes
// state through the wrapped function
export const hrsReducerHOF = (defFn) => {
  const ret = (state, action) => reducer(state, action, defFn)
  return ret
}

// traditional reducer which can be composed with other reducers using a composer
export const hrsReducer = (state, action, defFn) => {
  switch (action.type) {
    case 'dbdiff':
      return procDbDiff(state, action.diffs)
      break

    case 'dbdiffkv':
      return procDbDiffKV(state, action.diffs)
      break

    default:
      return defFn ? defFn(state) : state
  }
}
