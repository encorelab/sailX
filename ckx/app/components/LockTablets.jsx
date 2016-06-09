import React from 'react'

export default ( {ui, dispatch} ) => {
  return (
    <div>
      {ui.tabletsLocked ?
        <button onClick = {() => dispatch({type: 'UNLOCKTABLETS_UI'}) }>RESUME</button> :
        <button onClick = {() => dispatch({type: 'LOCKTABLETS_UI'}) }>PAUSE</button>
      }
    </div>
  )
}


