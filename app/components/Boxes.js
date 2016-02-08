import React from 'react';
import { render } from 'react-dom'
import { Flex, Block} from 'jsxstyle';
import { connect } from 'react-redux'

const Boxes = ( { boxes, dispatch } ) => { 
  const boxlist = boxes.map(e => { 
      const clickFn = () => { dispatch({type: 'DELETE_BOX', _id: e._id}) }
      return( <BoxContainer key={e._id} clickFn={clickFn} {...e}/> ) 
    }) 
  return(
    <div>
    {boxlist}
    </div>
  )}

const BoxContainer = ( { x, y, ...other} ) => {
  return(
    <Flex>
    <Block position='absolute'
      bottom={x}
      left={y}>
      <Box {...other}/>
    </Block>
    </Flex>
  )}

const Box = ( { title, clickFn } ) => {
  return(
    <Block border='1px solid'
      backgroundColor='#FEEFB3'
      width='150px'
      height='30px'
      fontSize='25px'
      textOverflow='ellipsis'
      overflow='hidden'>
      <div onClick={clickFn}>
    {title}
    </div>
    </Block>
  )}
    
// --------------------------------------

export const BoxWrapper = connect(
  e => ({boxes: e.boxes}))(Boxes)

