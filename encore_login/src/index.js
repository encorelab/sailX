import React from 'react'
import Hardcoded from './hardcoded'

const Student = ( {selection, onClick} ) => <li><a href="#" onClick={onClick}>{selection.student.name}</a> <i>{selection.CO.name}</i> Class: {selection.student.class} <b>{selection.student.role}</b></li>

const StudentList = ( {list, selectFn} ) => {
  return(
    <div>
    {
      list.map((e,i) => <Student selection={e} key={i} onClick={ () => selectFn(e) }/> )
    }
    </div>
  )
}


const LoginWrapper = ({ onSelect }) => {
  // turning on autologin for Cole (choose 4 for board)
  //onSelect(Hardcoded[0])
  return (
    <div>
      <StudentList list={Hardcoded} selectFn={onSelect}/>
    </div>
  )
}

export default LoginWrapper
