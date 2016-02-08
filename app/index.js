import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'

import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'

const store = configStore()
window.store = store

const Hi = (props) => {
  return(<div>
         <h1>CK</h1>
         { props.children }
         </div>
        )}

render(
  <Provider store={store}>

  <Router history={browserHistory}>
    <Route path="/" component={Hi}>
    <IndexRoute component='Footer'/>
      <Route path="/about" component={VisibleTodoList} />
      <Route path="/inbox" component={Footer} />
    </Route>
  </Router>

  </Provider>,
  document.getElementById('root')
)
