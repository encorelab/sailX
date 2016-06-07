import { combineReducers } from 'redux'
import crud from './reducers/crud-reducers'
import observations from './reducers/observations'
import ui from './reducers/ui'
import factory from './reducers/factory'

export default combineReducers({
  observations: crud('OBSERVATION', observations, [], {x: 0, y: 0}),
  ui: factory('UI', {infoOpen: false, addOpen: false, loggedIn: false, tabletsLocked: false}, ui)
})
