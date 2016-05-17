import React from 'react'

const Student = ( {name, birth, onClick} ) => <li><a href="#" onClick={onClick}>{name}</a> (born: {birth})</li>

const StudentList = ( {list, selectFn} ) => { return(
  <div>{list.map(e => {
    const clickFn = () => selectFn(e.name) 
    return(<Student name={e.name} birth={e.birth_year} onClick={ clickFn }/>)
  })}</div>
)}


class LoginWrapper extends React.Component {
  constructor() {
    super();
    this.state = {loading: "hello", studentList: []}
  }
  componentWillMount() {
    console.log(this.props)
      fetchUsers((e) => {
        this.setState({loading: false, studentList: e}) 
      })
  }

  render() {
      return(
          <div>
          { this.state.loading ? 
            <h1>Loading student list...</h1> :
            <StudentList list={this.state.studentList} selectFn={this.props.onSelect}/> }
          </div>
      )
  }
}

const fetchUsers = (callback) => {
    fetch("https://swapi.co/api/people").
      then(e => e.json()).
      then(e => callback(e.results))
}

export default LoginWrapper 
