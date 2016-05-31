import React from 'react'
import Hardcoded from './hardcoded'

const Student = ( {student, onClick} ) => <li><a href="#" onClick={onClick}>{student.name}</a> <i>{student.CO.name}</i></li>

const StudentList = ( {list, selectFn} ) => { return(
  <div>{list.map(e => {
    const clickFn = () => selectFn(e) 
    return(<Student student={e} onClick={ clickFn }/>)
  })}
  </div>
)}


class LoginWrapper extends React.Component {
  render() {
      return(
          <div>
            <StudentList list={Hardcoded} selectFn={this.props.onSelect}/> 
          </div>
      )
  }
}

export default LoginWrapper 
