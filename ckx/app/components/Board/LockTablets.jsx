import React from 'react'
import { connect } from 'react-redux'
import * as classStateActions from 'app/reducers/class-state/actions'
import { tabletsLocked } from 'app/reducers/class-state/selectors'

const LockTablets =  ( {tabletsLocked, unlockTablets, lockTablets} ) => {
  return (
    <div>
      {tabletsLocked ?
        <button onClick = {unlockTablets}>RESUME</button> :
        <button onClick = {lockTablets}>PAUSE</button>
      }
    </div>
  )
}

export default connect(
  e => ({tabletsLocked : tabletsLocked(e)}),
  classStateActions)(LockTablets)
