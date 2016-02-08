import React from 'react';
import { render } from 'react-dom'
import { Flex, Block} from 'jsxstyle';
import { connect } from 'react-redux'

import Draggable from 'react-draggable'

const handleStop = (event, ui) => {
  console.log('Event: ', event);
  console.log('Position: ', ui);
}

const Boxes = ( { boxes, dispatch } ) => { 
  const boxlist = boxes.map(e => { 
      const clickFn = () => { dispatch({type: 'DELETE_BOX', _id: e._id}) }
      const setXY = (a, ui) => { 
        console.log(ui.position)
        dispatch({type: 'MOVE_BOX', 
                 _id: e._id, delta_x: ui.position.left, delta_y: ui.position.top
        }) }
      return( <BoxContainer key={e._id} clickFn={clickFn} setXY={setXY} {...e}/> ) 
    }) 

  return(
    <div>
    {boxlist}
    </div>
  )}

  const BoxContainer = ( { x, y, setXY, title, ...other} ) => {
    return(
      <Draggable
        onStart={() => true}
        onDrag={(e, ui) => console.log("Position", ui.position) }
        onStop={setXY}>
      <div style={{position: 'absolute',
        border:'1px solid',
        backgroundColor:'#FEEFB3',
        width:'150px',
        height:'30px',
        fontSize:'25px',
        textOverflow:'ellipsis',
        overflow:'hidden',
        top:y,
        left:x}}>
      {title}
      </div>
      </Draggable>
    )}

// --------------------------------------

export const BoxWrapper = connect(
  e => ({boxes: e.boxes}))(Boxes)

