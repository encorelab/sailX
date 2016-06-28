import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import JsonTable from 'react-json-table'
import { filter, mapValues } from 'lodash'
import ResizableAndMovable from 'react-resizable-and-movable'
require('./index.css')

const horizon = Horizon({ host: window.location.hostname + ':8181', insecure: true, authType: 'unauthenticated' })

const subscribe = (db, onchange) => {
  horizon(db).watch().subscribe(db)
}

const procHorizon = (e) => {
  return e.map(row => {
    const nrow = mapValues(row, val => val instanceof Object ? JSON.stringify(val) : val)
    return {...nrow, ...{id: row.id.slice(0,4) + "..." } }
  })
}

class DbBox extends React.Component {
 constructor(props) {
    super()
    this.state = {
      obj: [], 
      input: props.collection ? props.collection : '', 
      subscription: undefined, msg: ''
    }
 }

  componentWillMount() {
    this.setState({x: Math.random() * 300, y: Math.random() * 300})
    if(this.props.collection) {
      this.connect()
    }
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
    let thisconn
    if(this.state.input.indexOf(",")) { 
      const splits = this.state.input.split(',')
      thisconn = splits[0].trim()
      this.setState({input: thisconn})
      splits.splice(1).forEach((e) => this.props.addCollectionFn(e.trim()))
    } else {
      thisconn = this.state.input
    }

    const sub = horizon(thisconn).watch().
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
    ReactDOM.findDOMNode(this.refs.input).focus()
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
    this.state = {boxes: [['aa', undefined]]}
  }

  close = (i) => {
    this.setState( {boxes: filter(this.state.boxes, (e) => e != i ) } ) 
  }

  getBoxes = () => {
    let boxholder = []
    for (let i of this.state.boxes) {
      boxholder.push(<DbBox 
        key={i[0]} 
        collection={i[1]}
        closeFn={() => this.close(i)}
        addCollectionFn = {this.addCollection}
      />)
    }
    return boxholder
  }

  addCollection = (coll) => {
    this.setState({boxes: [...this.state.boxes, [(new Date).getTime(), coll]]})
  }

  render() { return(
    <div>
      {this.getBoxes()}
      <button 
        style={{position: 'absolute', bottom: '33px', fontSize: '24px', zIndex: 999}}
        onClick={() => this.setState({boxes: [...this.state.boxes, [(new Date).getTime(), undefined]]})}>+</button>
    </div>
  )}
}

render(
  <div><h1 
      style={{color: '#ADD8E6', textAlign: 'center', fontFamily: 'Courier'}}
      >RethinkDB explorer</h1><BoxList /></div>,
  document.getElementById('root')
)
