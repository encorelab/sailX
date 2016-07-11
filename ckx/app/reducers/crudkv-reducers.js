import { omit } from 'lodash'

export default (state, action) => {
  switch (action.type) {
    // db sync actions
    case 'add':
    case 'edit':
      const len = Object.keys(action.doc).length 
      if (len != 1) {  // sanity check, because we're mindlessly merging two objects
        console.error('crudKV cannot take doc with more than one key')
      } else {
        return { ...state, ...action.doc }
      }
      break

    case 'delete':
      return omit(state, action.key)
      break

    case 'deleteall':
      return({})
      break

    default:
      return state
  }
}
