import React from 'react'
import Hardcoded from './hardcoded'

const Student = ( {selection, onClick} ) => <li><a href="#" onClick={onClick}>{selection.student.name}</a> <i>{selection.CO.name}</i> Class: {selection.student.class} <b>{selection.student.role}</b></li>

const StudentList = ( {list, selectFn} ) => { return(
  <div>
  {list.map(e => {
    const clickFn = () => selectFn(e) 
    return(<Student selection={e} onClick={ clickFn }/>)
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
