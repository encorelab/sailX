export const changeRoute = (route) => ({
  type: 'CHANGEROUTE/UI',
  route: route
})
  
export const setBoard = (group) => ({
  type: 'SETBOARD/UI',
  group: group 
})

export const setObservationFields = (fields) => ({
  type: 'SETOBSERVATIONFIELDS/UI',
  fields: fields
})

export const setName = (name) => ({
  type: 'SETNAME/UI',
  name: name
})

export const setClass = (cls) => ({
  type: 'SETCLASS/UI',
  class: cls
})

export const setRole = (role) => ({
  type: 'SETROLE/UI',
  role: role
})

export const logIn = () => ({
  type: 'LOGGEDIN/UI'
})

    /***** TABLETS *****/


//     case 'SWITCHVIEW':
//       return {...state, activeView: action.view}

//     case 'SETEDIT':
//       return {...state, editMode: true, observationToEdit: action.doc}
//     case 'UNSETEDIT':
//       return {...state, editMode: false, observationToEdit: {}}

//     case 'OPENINFO':
//       return {...state, infoOpen: action.id}
//     case 'CLOSEINFO':
//       return {...state, infoOpen: false}

//     case 'STARTUPLOADMEDIA':
//       return {...state, isUploading: true}
//     case 'ENDUPLOADMEDIA':
//       return {...state, isUploading: false}


