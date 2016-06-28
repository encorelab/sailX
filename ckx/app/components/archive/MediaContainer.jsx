import React from 'react';
import Dropzone from 'react-dropzone'

var MediaContainer = React.createClass({
  onDrop: function (files) {
    console.log('Received files: ', files);
  },

  render: function () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          <div>Attach Media</div>
        </Dropzone>

      </div>
    );
  }
});

export default MediaContainer