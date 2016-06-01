import React from 'react';
import { Flex, Block } from 'jsxstyle';
import { connect } from 'react-redux';
import { ObservationDetails } from './ObservationElements';
import Paper from 'material-ui/lib/paper';
import AspectRatio from 'react-icons/lib/md/aspect-ratio';
import Delete from 'react-icons/lib/md/delete';
import { shorten } from '../lib/utils';
// import AddBox from './AddBox'


// const Boxes = ( { boxes, ui, dispatch } ) => {
//   const addFn = () => { dispatch({type: 'OPENADD_UI'}) }
//   const closeAddFn = () => { dispatch({type: 'CLOSEADD_UI'}) }
//   const submitAdd = (e) => {
//     closeAddFn()
//     dispatch({type: 'ADD_BOX', doc: e})
//   }

//   const boxlist = boxes.map(e => {
//     const clickFn = () => { dispatch({type: 'DELETE_BOX', id: e.id}) }
//     const infoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
//     const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

//     const setXY = (a, ui) => {
//       dispatch({ type: 'MOVE_BOX', id: e.id, delta_x: ui.position.left, delta_y: ui.position.top })
//     }

//     return (
//       <div>
//         <BoxContainer
//           key={e.id}
//           clickFn={clickFn}
//           setXY={setXY}
//           infoFn={infoFn}
//           {...e}
//         />
//         <BoxDetail
//           box={e}
//           key={e.id+'info'}
//           onClose={closeInfoFn}
//           title={e.title}
//           text={e.content}
//           open={ui.infoOpen == e.id}
//         />
//       </div>
//     )
//   })

//   return (
//     <div>
//       {boxlist}
//       <AddBox
//         isOpen={ui.addOpen}
//         openFn={addFn}
//         closeFn={closeAddFn}
//         submitFn={submitAdd}
//         fields={ui.fields}
//       />
//     </div>
//   )
// }

const BoxContainer = ( { title, infoFn, clickFn, ...box} ) => {
  const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  };

  return (
    <div style =
      {
        {
          fontSize: '20px',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }
      }
    >
      <Paper zDepth = {3} style = {style} >
        <div>
          {shorten(title, 20)}
          <span style = {{float:'right'}} >
            <Delete onClick = {clickFn} />
            <AspectRatio onClick = {infoFn} />
          </span>
        </div>
        <div style =
          {
            {
              fontSize: '15px',
              float: 'left',
              marginTop: '15px',
              marginLeft: '5px'
            }
          }
        >
          {shorten(box.content, 100)}
        </div>
      </Paper>
    </div>
  )
}

// --------------------------------------


const List = ( { boxes, ui, dispatch } ) => {
  const boxlist = boxes.map(e => {
    const clickFn = () => { dispatch({type: 'DELETE_BOX', id: e.id}) }
    const infoFn = () => { dispatch({type: 'OPENINFO_UI', id: e.id}) }
    const closeInfoFn = () => { dispatch({type: 'CLOSEINFO_UI', id: e.id}) }

    return (
      <div>
        <ul>
          <li>
            <BoxContainer
              key={e.id}
              clickFn={clickFn}
              infoFn={infoFn}
              {...e}
            />
            <ObservationDetails
              box={e}
              key={e.id+'info'}
              onClose={closeInfoFn}
              title={e.title}
              text={e.content}
              open={ui.infoOpen == e.id}
            />
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div>
      {boxlist}
    </div>
  )
}



export const BoxList = connect(e => ( {boxes: e.boxes, ui: e.ui} ))(List)

