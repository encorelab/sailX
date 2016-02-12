export default (kind, init, reducer) => { return(
(state = init, fullaction) => {
  if ( fullaction.type.indexOf(kind) == -1) { return state } else {     // only carry on if the action kind is the one we want, then strip the action kind to make reducers generic
  let action = { ...fullaction,
    type: fullaction.type.split('_')[0]
  }
return reducer(state, action)
  }
})}
