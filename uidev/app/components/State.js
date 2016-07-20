import React from 'react'
import Inspector from 'react-json-inspector'
require('../../node_modules/react-json-inspector/json-inspector.css')


export default (state) => <div><h1>State</h1><Inspector data={state.state} validateQuery = {(e) => e && e.length > 2}/></div>
