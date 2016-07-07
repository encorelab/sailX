import { combineReducers } from 'redux'
import crud from './reducers/crud-reducers'
import observations from './reducers/observations'
import ui from './reducers/ui'
import studentState from './reducers/student-state'
import factory from './reducers/factory'
import { identity } from './lib/utils'

export default combineReducers({
  observations: crud('OBSERVATION', observations, [], {x: 0, y: 0}),
  //studentState: crud('STUDENT_STATE', studentState, []),
  studentState: crud('DRAFT', studentState, []),
  classState: crud('CLASS_STATE', identity, []),
  ui: factory('UI', {infoOpen: false, addOpen: false, loggedIn: false, tabletsLocked: false}, ui),
})
