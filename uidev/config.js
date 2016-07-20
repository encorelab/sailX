// This file contains different "state" objects that can be loaded into an app while running, to test out
// different designs. It also contains a list of the top level components that should be available. Make
// sure the file is valid JS.

import lodash from 'lodash'

// State: the entire state is simply a json object, arbitrarily nested. Note that you only need to add the state
// necessary to render the component you wish to render. All states are merged with the default state, which 
// functions as a specification of the "shape" of the state.
export const defaultState = {
  ui: {}, 
  groups: [], 
  boxes: [],
  students: []
}

const empty = {title: "empty", state: {}}

const twoboxes = {title: "twoboxes", state: { boxes: [
  {title: "One box", x: 200, y: 500, text: "This is a box", id: 1}, 
  {title: "Box number two", x: 300, y: 200, text: "Boxes boxes everywhere", id: 2}
]}}

const manyboxes = {title: "manyboxes", state: { boxes: [
  {title: "One box", x: 0, y: 0, text: "This is a box", id: 1}, 
  {title: "Box number two", x: 300, y: 200, text: "Boxes boxes everywhere", id: 2},
  {title: "One box", x: 50, y: 50, text: "This is a box", id: 1}, 
  {title: "Box number two", x: 350, y: 200, text: "Boxes boxes everywhere", id: 2},
  {title: "One box", x: 100, y: 100, text: "This is a box", id: 1}, 
  {title: "Box number two", x: 300, y: 200, text: "Boxes boxes everywhere", id: 2}
], students: ["Peter", "John", "Stian"]}}

const stateList = [
  empty, twoboxes, manyboxes
]

export const states = stateList.map(e => ({...e, state: {...defaultState, ...e.state}}))

// Routes: One entry for each top level component (page) that is to be tested, these also need to be imported at the top
// of the file
import BoxPage from './app/components/BoxPage'
import State from './app/components/State'
export const routes = [
  {title: "Boxes", component: BoxPage},
  {title: "State", component: State}
]
