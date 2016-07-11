export default (kind, init, reducer) => {
  return (
    (state = init, fullaction) => {
      if (fullaction.type.indexOf(kind) == -1) {
        // only carry on if the action kind is the one we want, then strip the action kind to make reducers generic
        return state
      } else {
        let action = {
          ...fullaction,
          type: fullaction.type.split('/')[0]
        }
        return reducer(state, action)
      }
    }
  )
}
