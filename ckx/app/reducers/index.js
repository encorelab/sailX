import { combineReducers } from 'redux'
import crud from './crud-reducers'
import crudKV from './crudkv-reducers'
import observations from './observations'
import ui from '../ui'
import studentState from './student-state'
import factory from './factory'
import { identity } from '../lib/utils'

export default combineReducers({
  observations: crud('OBSERVATION', observations, [], {x: 0, y: 0}),
  //studentState: crud('STUDENT_STATE', studentState, []),
  studentState: crud('DRAFT', studentState, []),
  classState: crudKV('CLASS_STATE', identity, {}),
  ui: factory('UI', {infoOpen: false, addOpen: false, loggedIn: false, tabletsLocked: false}, ui),
})
