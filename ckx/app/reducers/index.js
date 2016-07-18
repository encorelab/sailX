import { hrsReducer } from 'horizon-redux-sync'
import reducerDict from '../lib/reducer-dict'
import defaultKVReducer from './crudkv-reducers'
import defaultReducer from './crud-reducers'
import observations from './observations/reducers'
import ui, { defaultUI } from './ui/reducers'
import studentState from './student-state'
import { composeReducers } from '../lib/utils'

// combining the db reducer for KV stores, and some basic KV actions
// eg def will give us horizon + default (eg crud)
const defKV = composeReducers(hrsReducer, defaultKVReducer)
const def = composeReducers(hrsReducer, defaultReducer)

// a dictionary of keys (which determine the state object path, and the selector to
// append to actions, and an array of two elements: function to call on state (must
// return unchanged state by default), and optionally initial state
export default reducerDict({
  observations: [composeReducers(hrsReducer, observations), []],
  ui: [ui, defaultUI],
  studentstate: [composeReducers(studentState, defKV), {}],
  class_state: [defKV, {}]
})
