import React from 'react'
import Create from 'react-icons/lib/md/create'
import './AddObservation.scss'

export default ( { onClick } ) => {
  // const style = {
  //   position: 'fixed',
  //   left: '50%',
  //   bottom: '20px',
  //   transform: 'translate(-50%, -50%)',
  //   margin: '0 auto'
  // }

  return (
    <Create
      className = "AddObservation"
      size = '4em'
      onClick = {onClick}
    />
  )
}