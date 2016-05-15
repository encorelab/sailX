export default (state, action) => {
  switch (action.type) {
    case 'OPENINFO':
      return {...state, infoOpen: action.id}
    case 'CLOSEINFO':
      return {...state, infoOpen: false}
    case 'OPENADD':
      if (!state.infoOpen) {
        return {...state, addOpen: true}
      } else {
        return state
      }
    case 'CLOSEADD':
      return {...state, addOpen: false}
    case 'CHANGEROUTE':
      return {...state, route: action.route}
    case 'SETGROUP':
      return {...state, fields: action.fields}
    case 'SETNAME':
      return {...state, name: action.name}
    case 'LOGGEDIN':
      return {...state, loggedIn: true}
    default:
      return state
  }
}
