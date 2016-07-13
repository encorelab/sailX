// router for student view

import React from 'react';
import { connect } from 'react-redux';
import ReadView from './ReadView'
import WriteView from './WriteView'
import LockedView from './LockedView'

const Router = ({ locked, activeView }) => { 
  if(locked) {
    return <LockedView />
  } else {
    switch(activeView) {
      case 'write':
        return <WriteView />
        break

      default: 
        return <ReadView />
    }
  }
}

export default connect(e => ({locked: e.ui.tablets_locked, activeView: e.ui.activeView}))(Router)
