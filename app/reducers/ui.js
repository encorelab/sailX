export default (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'OPENINFO':
      return {...state, infoOpen: action._id}
    case 'CLOSEINFO':
      return {...state, infoOpen: false}
    case 'OPENADD':
      if(!state.infoOpen) { return {...state, addOpen: true} } else { return state }
    case 'CLOSEADD':
      return {...state, addOpen: false}
    case 'CHANGEROUTE':
      return {...state, route: action.route}
    default:
      return state
  }
}
