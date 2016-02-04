import { combineReducers } from 'redux'

const uuid = () =>
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16))

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        {
            _id: uuid(),
          completed: false,
          text: action.text
        }, 
        ...state
      ]

    case 'INSERT_TODO':
      return [
        action.todo, 
        ...state
      ]

    case 'DELETE_TODO':
      return state.filter(todo =>
        todo._id !== action._id
      )

    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action._id ?
          Object.assign({}, todo, { text: action.text }) :
          todo
      )

    case 'UPDATE_TODO':
      return state.map(todo =>
        todo._id === action.todo._id ?
          action.todo :
          todo
      )
      
    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo._id === action._id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )

    case 'COMPLETE_ALL':
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => Object.assign({}, todo, {
        completed: !areAllMarked
      }))

    case 'CLEAR_COMPLETED':
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}

export default combineReducers({ todos: todos })
