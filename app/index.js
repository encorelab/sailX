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

const boxlist = []

const store = configStore({ boxes: boxlist })
window.store = store
window.pouchsync = PouchSync

const App = (props) => {
  return(
    <div>
      { props.children }
      </div>
  )}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component='Footer'/>
        <Route path="/test" component={Drag} />
        <Route path="/inbox" component={BoxWrapper} />
        <Route path="/forms" component={AddBox} />
        <Route path="/state" component={State} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
