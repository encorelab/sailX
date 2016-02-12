import React from 'react';
import { Flex, Block} from 'jsxstyle';
import { connect } from 'react-redux'
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio'
import Delete from 'react-icons/lib/md/delete'
import { shorten } from '../lib/utils'
import AddBox from './AddBox'

import Draggable from 'react-draggable'

const format = (box) => {
  console.log("BOX", box)
  let c = []
  for(var key in box) {
    if(box.hasOwnProperty(key)) {
      c.push([key, box[key]])
    }
  }
  console.log(c)
  return c.map( k => <div><b>{k[0]}</b>:{k[1]}<br /></div>)
}


const BoxDetail = ( { open, onClose, title, box } ) => { 
  const actions = [<FlatButton
    label="X"
    secondary={true}
    onClick={onClose}
    />]
  
  return(
        <Dialog
          title={title}
          modal={false}
          actions={actions}
          open={open}
          onRequestClose={onClose}
        >
        {format(box)}
        </Dialog>
)}

const Boxes = ( { boxes, ui, dispatch } ) => { 
  const addFn = () => { dispatch({type: 'OPENADD_UI'}) }
  const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
  const submitAdd = (e) => { 
    closeAddFn()
    dispatch({type: 'ADD_BOX', doc: e})
  }

  const boxlist = boxes.map(e => { 
      const clickFn = () => { dispatch({type: 'DELETE_BOX', _id: e._id}) }
      const infoFn = () => { dispatch({type: 'OPENINFO_UI', _id: e._id}) }
      const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', _id: e._id}) }

      const setXY = (a, ui) => { 
        dispatch({type: 'MOVE_BOX', 
                 _id: e._id, delta_x: ui.position.left, delta_y: ui.position.top
        }) }
      return( <div><BoxContainer key={e._id} clickFn={clickFn} setXY={setXY} 
             infoFn={infoFn} {...e}/>
            <BoxDetail box={e} key={e._id+'info'} onClose={closeInfoFn} title={e.title} text={e.content} open={ui.infoOpen == e._id} />
            </div>
            )}) 

  return(
    <div>
    {boxlist}
    <AddBox isOpen={ui.addOpen} openFn={addFn} closeFn={closeAddFn} submitFn={submitAdd} fields={ui.fields}/>
    </div>
  )}

  const BoxContainer = ( { x, y, setXY, title, infoFn, clickFn, ...box} ) => {
    const style = {
      height: 100,
      width: 300,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return(
      <Draggable
        onStart={() => true}
        onStop={setXY}
        onTouchTap={() => console.log("Tap")}
        cancel='.nodrag'>
      <div style={{position: 'absolute',
        fontSize:'20px',
        textOverflow:'ellipsis',
        overflow:'hidden',
        top:y,
        left:x}}>
        <Paper zDepth={3} style={style}>
   <div>   {shorten(title, 20)}
      <span style={{float:'right'}}>
<Delete onClick={clickFn}/>
<AspectRatio onClick={infoFn}/>
</span>
</div>
    
    <div style={{fontSize: '15px', float: 'left', marginTop: '15px', marginLeft: '5px'}}>{shorten(box.content, 100)}</div>
      </Paper>
      </div>
      </Draggable>
    )}

// --------------------------------------

export const BoxWrapper = connect(
  e => ({boxes: e.boxes, ui: e.ui}))(Boxes)

