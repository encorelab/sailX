import React from 'react';
import { render } from 'react-dom'
import { Flex, Block} from 'jsxstyle';
import { connect } from 'react-redux'

export const Boxes = ( { boxes } ) => { 
  return(
    <div>
    { boxes.map(e => <BoxContainer key={e._id} {...e}/> ) } 
    </div>
  )}

export const BoxContainer = ( { x, y, ...other} ) => {
  return(
    <Flex>
    <Block position='absolute'
      bottom={x}
      left={y}>
      <Box {...other}/>
    </Block>
    </Flex>
  )}

export const Box = ( { title } ) => {
  return(
    <Block border='1px solid'
      backgroundColor='#FEEFB3'
      width='150px'
      height='30px'
      fontSize='25px'
      textOverflow='ellipsis'
      overflow='hidden'>
    {title}
    </Block>
  )}
    
export const BoxWrapper = connect(
  e => ({boxes: e.boxes}))(Boxes)

