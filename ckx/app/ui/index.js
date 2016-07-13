import React from 'react'
import { omit } from 'lodash'

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
    case 'POSTNOTICE':
      return {...state, notice: action.title}
    case 'CLEARNOTICE':
      return omit(state, 'notice')
    case 'SETROLE':
      return {...state, role: action.role}
    case 'LOGGEDIN':
      return {...state, loggedIn: true}

    /***** TABLETS *****/

    // also clear notices on switching view
    case 'SWITCHVIEW':
      return omit({...state, activeView: action.view}, 'notice')

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
