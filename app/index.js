import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'
import { BoxWrapper } from './components/Boxes'
import Drag from './components/Drag'
import AddBox from './components/AddBox'
import State from './components/State'
import PouchSync from './lib/pouch-middleware'
import AppBar from './components/AppBar'
import Groups from './components/GroupList'
import { connect } from 'react-redux'

const boxlist = []
const groups = []

const store = configStore({ boxes: boxlist, groups: groups, ui: {infoOpen: false, addOpen: false, route: 'login' }})
window.store = store
window.pouchsync = PouchSync
PouchSync(store, "/groups", "groups", "GROUP")

const Route = ({ route }) => {
  switch (route) {
    case 'login': 
      return <Groups />
    case 'boxes':
      return <BoxWrapper />
    case 'state':
      return <State />
    default:
      return <State />
  }
}

const AppWrapped = connect(
  e => ({route: e.ui.route}))(Route)

render(
  <Provider store={store}>
  <AppWrapped />
  </Provider>,
  document.getElementById('root')
)
