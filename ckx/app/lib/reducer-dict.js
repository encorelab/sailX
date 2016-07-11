// takes an array of selectors, and reducer functions. any action.type without
// a slash goes through a default selector (which has access to the entire state)
export default (reducerDictAry) => {

  // generate a default state based on the default state pieces for each keyed reducer
  const defVal = Object.keys(reducerDictAry).reduce(
    (acc, val) => {
      if(reducerDictAry[val][1]) { 
        acc[val] = reducerDictAry[val][1] 
      }
      return acc
    }, {}
  )

  const reducerDict = Object.keys(reducerDictAry).reduce(
    (acc, val) => {
      acc[val] = reducerDictAry[val][0]
      return acc
    }, {}
  )

  return (state = defVal, action) => {
    const parts = action.type.toLowerCase().split('/')
    switch (parts.length) {
      case 1:
        if(reducerDict['default']) { 
          return reducerDict.default(state, action)
        } else {
          console.error('Action without selector supplied, but missing default reducer')
          return state
        }
        break

      case 2: 
        if(reducerDict[parts[1]]) { 
          const newAction = {...action, type: parts[0]}
          const partState = reducerDict[parts[1]](state[parts[1]], newAction)
          let newState = state
          newState[parts[1]] = partState
          return newState
        } else {
          console.error('Missing reducer for selector ' + parts[1])
          return state
        }
        break

      default:
        console.error('Avoid more than one / in the action type')
        return state
    }
  }
}



