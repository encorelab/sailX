import { combineReducers } from 'redux'

const uuid = () =>
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))

function boxes(state = [], action) {
  switch (action.type) {
    case 'ADD_BOX':
      return [
        ...state,
        {
            _id: uuid(),
          x: 0,
          y: 0,
          ...action.box
        } 
      ]

    case 'INSERT_BOX':
      return [
        action.box, 
        ...state
      ]

    case 'DELETE_BOX':
      return state.filter(box =>
        box._id !== action._id
      )

    case 'EDIT_BOX':
      return state.map(box =>
        box._id === action.box._id ?
          {...box, ...action.box} : 
          box
      )

    case 'UPDATE_BOX':
      return state.map(box =>
        box._id === action.box._id ?
          action.box :
          box
      )
      
    case 'COMPLETE_BOX':
      return state.map(box =>
        box._id === action.box._id ?
          {...box, completed: !box.completed } :
          box
      )

    case 'COMPLETE_ALL':
      const areAllMarked = state.every(box => box.completed)
      return state.map(box => ({...box, 
        completed: !areAllMarked})
      )

    case 'CLEAR_COMPLETED':
      return state.filter(box => box.completed === false)

    default:
      return state
  }
}

export default combineReducers({ boxes: boxes })
