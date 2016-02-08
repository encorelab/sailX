import React from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import configStore from './store';
import { IndexRoute, browserHistory, Router, Route, Link } from 'react-router'

import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'
import { Boxes } from './components/Boxes'

const store = configStore()
window.store = store

const Hi = (props) => {
  return(<div>
         <h1>CK</h1>
         { props.children }
         </div>
        )}


const boxlist = [{id: 0, title:"Hi", x:30, y:40},
  {id: 1, title:"Hello", x:10, y:5},
  {id: 2, title:"Hullaballubao arminarogo", x:1, y:1}]

const Test = () => 
  <Boxes boxes={boxlist}/>

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
