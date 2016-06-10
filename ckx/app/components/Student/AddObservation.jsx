import React from 'react'
import Create from 'react-icons/lib/md/create'

export default ( { addNewObservation } ) => {
  const style = {
    position: 'fixed',
    left: '50%',
    bottom: '20px',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto'
  }

  return (
    <Create
      style = {style}
      size = '4em'
      onClick = {addNewObservation}
    />
  )
}