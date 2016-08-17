import React from 'react';
import { connect } from 'react-redux';
import ObservationList from './ObservationList'
import ObservationDetail from './ObservationDetail'
import AddObservation from './AddObservation'

const Header = ({ board, user }) => {return (
  <div style = {headerStyle}>
    <h1 style = {h1Style}>{board}</h1>
    <h1 style = {h1Style}>{user}</h1>
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

const headerStyle = {
  background: '#E44B27',
}

const h1Style = {
  color: '#ffffff',
  fontWeight: '400',
  display: 'inline-block',
  padding: '5px 30px'
}