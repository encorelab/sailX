import React from 'react';
import { render } from 'react-dom'
import Dropdown from '../vendor/react-dropdown'
require('../vendor/react-dropdown/dist/style.css')

import { defaultState, states, routes } from '../config'

// set up tracking of URL bar
const navigated = () => {
  const newroute = window.location.hash.slice(2)
}

export const initialize = () => {
  window.addEventListener('hashchange', navigated, false)
  navigated()
}

export const changeRoute = (route) => {
  window.setTimeout( () => window.location.hash = '/' + route, 0)
}

class Route extends React.Component {
  state = {
    curstate: defaultState, 
    stateName: undefined,
    states: states, 
    routes: routes,
    route: {title: undefined, component: () => <div></div>},
    showmenu: true
  }

  setRoute = (route) => {
    this.setState({route: route})
  }
  
  changeState = ( { label } ) => {
    const newstate = this.state.states.filter(e => e.title == label)[0].state
    this.setState({curstate: newstate})
  }

  routeMenu = this.state.routes.map(e => ({label: e.title, value: e.title}))
  stateMenu = this.state.states.map(e => ({label: e.title, value: e.title}))

  changeRoute = ( { label } ) => {
    const newroute = this.state.routes.filter(e => e.title == label)[0].component
    this.setState({route: {title: label, component: newroute}})
  }

  menu = () => <div style={{height: '50px', width: '700px', margin: '0px', background: '#ffc'}}>
    <b>Settings</b> 
    <div style={{top: 0, left: 200, position: 'absolute'}}>
      <Dropdown options={this.routeMenu} placeholder={this.state.route.title || 'Select route' } onChange={this.changeRoute} />
    </div> 
    <div style={{top: 0, left: 400, position: 'absolute'}}>
      <Dropdown options={this.stateMenu} placeholder={this.state.stateName || 'Select state'} onChange={this.changeState} />
    </div>
    <div style={{top: 0, right: 10, position: 'absolute'}}><span onClick={() => this.setState({showmenu: false})}>x</span></div>
    </div>

  render() { 
    return (
    <div>
    <div style={{position: "absolute", top: 0}}>
    {this.state.showmenu ? 
      this.menu() : 
      <span onClick={() => this.setState({showmenu: true})}>&#9776;</span>
    }
    </div>
    <div style={this.state.showmenu ? {position: 'absolute', top: '55px'} : {}}>

    {React.createElement(this.state.route.component, {state: this.state.curstate})}
    </div>
    </div>
  ) }
}

render( <Route />, document.getElementById('root'))
