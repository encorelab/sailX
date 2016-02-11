import React from 'react'
import { connect } from 'react-redux'
import Inspector from 'react-json-inspector'
require('../../node_modules/react-json-inspector/json-inspector.css')


const StateView = (state) => <Inspector data={state.state} validateQuery = {(e) => e && e.length > 2}/>

const State = connect(
e => ({state: e}))(StateView)

export default State

