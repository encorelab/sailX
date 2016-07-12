import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import ObservationDetail from './ObservationDetail'
import AddObservation from './AddObservation'

const Header = ({ board, user }) => {return(
  <div>
    <h1>{board}</h1>
    <h1>{user}</h1>
  </div>
)}

const ReadView = ({ board, user }) => { return (
  <div>
    <Header board={board} user={user} /> 
    <ObservationList />
    <ObservationDetail />
    <AddObservation />
  </div>
)}

export default connect(e => ({board: e.ui.board, user: e.ui.user}))(ReadView)
