import React from 'react';
import { connect } from 'react-redux';
import StudentReadView from './StudentReadView'
import LockedView from './LockedView'
import _ from 'lodash'

export default = ({ ui, observations, dispatch }) => {
  let boardEl;
  if (ui.tabletsLocked) {
    boardEl = <LockedView />
  } else {
    boardEl = <StudentReadView
      ui = {ui}
      observations = {observations}
      dispatch = {dispatch}
    />
  }

  return (
    <div>
      {boardEl}
    </div>
  )
}