import React from 'react'

export default ( {ui, dispatch} ) => {
  const lockFn = () => {
    if (ui.tabletsLocked) {
      dispatch({type: 'UNLOCKTABLETS_UI'});
    } else {
      dispatch({type: 'LOCKTABLETS_UI'});
    }
  };

  let lockBtn;
  if (ui.tabletsLocked) {
    lockBtn = <button onClick = {lockFn}>RESUME</button>
  } else {
    lockBtn = <button onClick = {lockFn}>PAUSE</button>
  }

  return (
    <div>
      {lockBtn}
    </div>
  )
}