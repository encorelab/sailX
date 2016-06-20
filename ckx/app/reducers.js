import { combineReducers } from 'redux'
import crud from './reducers/crud-reducers'
import observations from './reducers/observations'
import ui from './reducers/ui'
import drafts from './reducers/drafts'
import factory from './reducers/factory'
import { identity } from './lib/utils'

export default combineReducers({
  observations: crud('OBSERVATION', observations, [], {x: 0, y: 0}),
  ui: factory('UI', {infoOpen: false, addOpen: false, loggedIn: false, tabletsLocked: false}, ui),
  drafts: crud('DRAFT', drafts),
  classState: crud('CLASS_STATE', identity, [])
})



//drafts: factory('DRAFTS', drafts),