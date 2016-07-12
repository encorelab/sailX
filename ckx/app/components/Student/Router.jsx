// router for student view

import React from 'react';
import { connect } from 'react-redux';
import ReadView from './ReadView'
import WriteView from './WriteView'
import LockedView from './LockedView'

const Router = ({ locked, activeView }) => { 
  let component
  if(locked) {
    component = <LockedView />
  } else {
    switch(activeView) {
      case 'write':
        component = <WriteView />
        break

      default: 
        component = <ReadView />
    }
  }
  return component
}

export default connect(e => ({locked: e.ui.tablets_locked, activeView: e.ui.activeView}))(Router)
