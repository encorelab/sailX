import { connect } from 'react-redux'
import TodoList from '../components/TodoList'


const VisibleTodoList = connect(
e => ({todos: e.todos, onTodoClick: () => null}))(TodoList)

export default VisibleTodoList
