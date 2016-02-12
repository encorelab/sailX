import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'
import { BoxWrapper } from './components/Boxes'
import Drag from './components/Drag'
import AddBox from './components/AddBox'
import State from './components/State'
import PouchSync from './lib/pouch-middleware'
import AppBar from './components/AppBar'
import Groups from './components/GroupList'

const boxlist = []
const groups = [{name: "Group 1"}, {name: "Group 2"}]

const store = configStore({ boxes: boxlist, groups: groups, ui: {infoOpen: false, addOpen: false }})
window.store = store
window.pouchsync = PouchSync
PouchSync(store, "/boxes", "A", "BOX")
const App = (props) => {
  return(
    <div>
      { props.children }
      </div>
  )}

    //{ //<AppBar /> }
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component='Footer'/>
        <Route path="/test" component={Drag} />
        <Route path="/boxes" component={BoxWrapper} />
        <Route path="/forms" component={AddBox} />
        <Route path="/state" component={State} />
        <Route path="/groups" component={Groups} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
