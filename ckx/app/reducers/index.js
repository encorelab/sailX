import reducerDict from '../lib/reducer-dict'
import crud from './crud-reducers'
import crudKV from './crudkv-reducers'
import observations from './observations'
import ui, { defaultUI } from '../ui'
import studentState from './student-state'
import factory from './factory'
import { identity } from '../lib/utils'

const defaultReducer = (state, action) => {
  switch(action.type) {
    case 'delete all':
      return {}
    default:
      return state
  }
}

// a dictionary of keys (which determine the state object path, and the selector to
// append to actions, and an array of two elements: function to call on state (must
// return unchanged state by default), and optionally initial state
export default reducerDict({
  observations: [observations],
  ui: [ui, defaultUI],
  studentstate: [identity, {}],
  classstate: [identity, {tablets_locked: false}],
  default: [defaultReducer]
})
  // observations: crud('OBSERVATION', observations, [], {x: 0, y: 0}),
  // //studentState: crud('STUDENT_STATE', studentState, []),
  // studentState: crud('DRAFT', studentState, []),
  // classState: crudKV('CLASS_STATE', identity, {}),
  // ui: factory('UI', {infoOpen: false, addOpen: false, loggedIn: false, tabletsLocked: false}, ui),
// })
