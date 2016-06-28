import React from 'react';
import { render } from 'react-dom'
import JsonTable from 'react-json-table'
import { filter } from 'lodash'
import ResizableAndMovable from 'react-resizable-and-movable'
require('./index.css')

const horizon = Horizon({ host: window.location.hostname + ':8181', insecure: true, authType: 'unauthenticated' })

const subscribe = (db, onchange) => {
  horizon(db).watch().subscribe(db)
}

const procHorizon = (e) => {
  return e.map(row => ({...row, ...{id: row.id.slice(0,4) + "..." } }))
}

class DbBox extends React.Component {
 constructor() {
    super()
    this.state = {obj: [], input: '', subscription: undefined, msg: ''}
  }

  componentWillMount() {
    this.setState({x: Math.random() * 300, y: Math.random() * 300})
  }
  
  dbSuccess = (e) => { 
    this.dbChange(e)
    this.setState({msg: "Connected to " + this.state.input})
  }

  dbError = (err) => {
    this.setState({subscription: undefined, msg: "Connection failed"})
  }

  // user has clicked on connect, cancel existing watch and set up new
  connect = () => {
    if(this.state.subscription) { this.state.subscription.unsubscribe() }
    const sub = horizon(this.state.input).watch().
      subscribe(this.dbSuccess, this.dbError)

    this.setState({subscription: sub})
  }

  dbChange = (e) => {
    this.setState({obj: procHorizon(e)})
  }

  dragStop = (e, ui) => {
    this.setState({x: ui.position.left, y: ui.position.top})
  }

  handleKeyPress = (target) => {
    if(target.charCode==13){
      this.connect()
    }

  }

  componentDidMount = () => {
    React.findDOMNode(this.refs.input).focus()
  }

  render = () => {return (
    <ResizableAndMovable
      width={500}
      height={200}
      x={this.state.x}
      y={this.state.y}
      className={'item'}
      onDragStop={this.dragStop}
      >
      <div>
      <input 
        type='text' 
        ref='input'
        name='db' 
        value={this.state.input} 
        onChange={(e) => this.setState({input: e.target.value})}
        onKeyPress={this.handleKeyPress}
      />
      <button 
        type='button'
        onClick={this.connect}
      >Connect</button>
    <span style={{color: 'red'}}>{this.state.msg}</span>
    <button
      style={{position: 'absolute', right: '5px'}} 
      onClick={this.props.closeFn}>X</button>
  </div>
    <ObjTable obj={this.state.obj} />
  </ResizableAndMovable>
  )}
}

const ObjTable = ({ obj }) => { return(
  <div>
    <JsonTable
      className = 'table'
      rows = {obj} />
  </div>
)}

class BoxList extends React.Component {
 constructor() {
    super()
    this.state = {boxes: ['aa']}
  }

  close = (i) => {
    this.setState( {boxes: filter(this.state.boxes, (e) => e != i ) } ) 
  }

  getBoxes = () => {
    let boxholder = []
    for (let i of this.state.boxes) {
      boxholder.push(<DbBox 
        key={i} 
        closeFn={() => this.close(i)}
      />)
    }
    return boxholder
  }

  render() { return(
    <div>
      {this.getBoxes()}
      <button 
        style={{position: 'absolute', bottom: '33px', fontSize: '24px'}}
        onClick={() => this.setState({boxes: [...this.state.boxes, (new Date).getTime()]})}>+</button>
    </div>
  )}
}

render(
  <div><h1 
      style={{color: '#ADD8E6', textAlign: 'center', fontFamily: 'Courier'}}
      >RethinkDB explorer</h1><BoxList /></div>,
  document.getElementById('root')
)
