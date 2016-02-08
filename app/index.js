import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'

import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'
import { BoxWrapper } from './components/Boxes'

const boxlist = []
// [{_id: "1", title:"Hi", x:30, y:40},
//   {_id: "2", title:"Hello", x:10, y:5},
//   {_id: "3", title:"Hullaballubao arminarogo", x:1, y:1}]

const store = configStore({ boxes: boxlist })
window.store = store

const Hi = (props) => {
  return(<div>
         <h1>CK</h1>
         { props.children }
         </div>
        )}


const Test = () => 
  <BoxWrapper />

render(
  <Provider store={store}>

  <Router history={browserHistory}>
    <Route path="/" component={Hi}>
    <IndexRoute component='Footer'/>
      <Route path="/test" component={Test} />
      <Route path="/inbox" component={Footer} />
    </Route>
  </Router>

  </Provider>,
  document.getElementById('root')
)
