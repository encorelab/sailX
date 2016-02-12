import { combineReducers } from 'redux'
import crud from './reducers/crud-reducers'
import boxes from './reducers/boxes'

export default combineReducers({
  boxes: crud('BOX', boxes, [], {x: 0, y: 0}),
  groups: crud('GROUP', (e) => e)
})
