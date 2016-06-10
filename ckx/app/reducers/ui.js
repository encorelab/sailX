import React from 'react'

export default (state, action) => {
  switch (action.type) {
    case 'CHANGEROUTE':
      return {...state, route: action.route}
    case 'SETBOARD':
      return {...state, board: action.group}
    case 'SETOBSERVATIONFIELDS':
      return {...state, fields: action.fields}
    case 'SETNAME':
      return {...state, user: action.name}
    case 'SETROLE':
      return {...state, role: action.role}
    case 'LOGGEDIN':
      return {...state, loggedIn: true}

    /***** BOARDS *****/

    case 'LOCKTABLETS':
      return {...state, tabletsLocked: true}
    case 'UNLOCKTABLETS':
      return {...state, tabletsLocked: false}

    /***** TABLETS *****/

    case 'SWITCHVIEW':
      return {...state, activeView: action.view}

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

    case 'STARTUPLOADMEDIA':
      return {...state, isUploading: true}
    case 'ENDUPLOADMEDIA':
      return {...state, isUploading: false}

    default:
      return state
  }
}

// sort this out at some point

// const P = React.PropTypes
// export const uiDefinition = P.shape({
//       infoOpen: P.boolean, //oneOfType([P.number, P.boolean]), // which info box is currently open, or false if none are open
//       addOpen: P.boolean,
//       route: P.boolean,
//       name: P.string,
//       loggedIn: P.boolean
// })
// console.log(uiDefinition)