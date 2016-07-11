import { currentDate } from '../lib/utils'
import { omit } from 'lodash'

// returns a function that contains normal CRUD + DB sync reducers for KV stores, with
// kind attached to end of reducer names (like INSERT_kind). Non-matching
// actions are passed on to restfn
export default (kind, restfn, initstate = [], deffields) => {
  return (
    (state = initstate, fullaction) => {
      // only carry on if the action kind is the one we want, then strip the action kind to make reducers generic
      if (fullaction.type.indexOf(kind) === -1) {
        return state
      } else {
        let action = {
          ...fullaction,
          type: fullaction.type.split('/')[0]
        }

        switch (action.type) {
          // db sync actions
          case 'INITSTATE':
            return action.docs

          case 'ADD':
          case 'EDIT':
          case 'DBINSERT':
          case 'DBUPDATE':
            const len = Object.keys(action.doc).length 
            if (len != 1) {  // sanity check, because we're mindlessly merging two objects
              console.error('crudKV cannot take doc with more than one key')
            } else {
              return { ...state, ...action.doc }
            }

          case 'DELETE':
          case 'DBDELETE':
            return omit(state, action.key)

          case 'DELETEALL':
            return({})

          default:
            return restfn(state, action, kind)
        }
      }
    }
  )
}

