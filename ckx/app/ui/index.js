import React from 'react'

export const defaultUI = ({
  route: 'login',
  loggedIn: false,
  tablets_locked: false,
  activeView: 'read',
  editMode: false,
  observationToEdit: {},
  infoOpen: false,
  route: 'login'
})

export default (state, action) => {
  switch (action.type.toUpperCase()) {
    case 'CHANGEROUTE':
      return {...state, route: action.route}
    case 'SETBOARD':
      return {...state, board: action.group}
    case 'SETOBSERVATIONFIELDS':
      return {...state, fields: action.fields}
    case 'SETNAME':
      return {...state, user: action.name}
    case 'SETCLASS':
      return {...state, class: action.class}
    case 'SETROLE':
      return {...state, role: action.role}
    case 'LOGGEDIN':
      return {...state, loggedIn: true}

    /***** TABLETS *****/

    case 'SWITCHVIEW':
      return {...state, activeView: action.view}

    case 'SETEDIT':
      return {...state, editMode: true, observationToEdit: action.doc}
    case 'UNSETEDIT':
      return {...state, editMode: false, observationToEdit: {}}

    case 'OPENINFO':
      return {...state, infoOpen: action.id}
    case 'CLOSEINFO':
      return {...state, infoOpen: false}

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
