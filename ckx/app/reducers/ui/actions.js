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

export const setLoggedIn = () => ({
  type: 'LOGGEDIN/UI'
})

/***** TABLETS *****/
export const switchView = (view) => ({
  type: 'SWITCHVIEW/UI',
  view: view
})

export const setEdit = (doc) => ({
  type: 'SETEDIT/UI',
  doc: doc
})

export const unsetEdit = () => ({
  type: 'UNSETEDIT/UI'
})

export const openInfo = (id) => ({
  type: 'OPENINFO/UI',
  id: id
})

export const closeInfo = () => ({
  type: 'CLOSEINFO/UI'
})

export const startUploadMedia = () => ({
  type: 'STARTUPLOADMEDIA/UI'
})

export const endUploadMedia = () => ({
  type: 'ENDUPLOADMEDIA/UI'
})

export const postNotice = (notice) => ({
  type: 'POSTNOTICE/UI',
  title: notice
})

export const clearNotice = () => ({
  type: 'CLEARNOTICE/UI'
})
