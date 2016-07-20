import React from 'react';

const Box = ( { title, x, y } ) => <div style={{
  height: 100,
  width: 300,
  margin: 20,
  display: 'inline-block', 
  position: "absolute", 
  top: y, 
  left: x
}}> {title}</div>

const Boxes = ( { boxes } ) => <div>
  <h1>Boxes</h1>
  {boxes.map(e => <Box {...e} />)}
  </div>

// receives entire state as prop, and selects subtree to pass on to actual component, gets exported
export default ( { state } ) => <Boxes boxes={state.boxes} />

