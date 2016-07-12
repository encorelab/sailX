import React from 'react';
import FRC from 'formsy-react-components'

export default (e, observation) => {
  const { id, ...rest } = e

  switch (e.kind) {
    case 'INPUT':
      return (
        <FRC.Input
          name = {id}
          id = {id}
          key = {id}
          type = 'text'
          {...rest}
        />
      )
    case 'TEXTAREA':
      return (
        <FRC.Textarea
          name = {id}
          id = {id}
          key = {id}
          {...rest}
        />
      )
    case 'FILE':
      return (
        <FRC.File
          id = 'file'
          ref = 'file'
          type = 'file'
          name = 'file'
          accept = '.jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov' multiple
        />
      )
  }
}


