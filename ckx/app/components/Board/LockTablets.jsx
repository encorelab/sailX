import React from 'react'
import { connect } from 'react-redux'
import * as classStateActions from 'app/reducers/class-state/actions'

const LockTablets =  ( {tabletsLocked, unlockTablets, lockTablets} ) => {
  return (
    <div>
      {tabletsLocked ?
        <button onClick = {lockTablets}>RESUME</button> :
        <button onClick = {unlockTablets}>PAUSE</button>
      }
    </div>
  )
}

export default connect(
  e => ({tabletsLocked : e.class_state.tabletsLocked}),
  classStateActions)(LockTablets)