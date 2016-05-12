import { combineReducers } from 'redux'
import crud from './reducers/crud-reducers'
import boxes from './reducers/boxes'
import ui from './reducers/ui'
import factory from './reducers/factory'

export default combineReducers({
  boxes: crud('BOX', boxes, [], {x: 0, y: 0}),
  groups: crud('GROUP', (e) => e),
  ui: factory('UI', {infoOpen: false, addOpen: false}, ui)
})
