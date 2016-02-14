import React from 'react'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'

var App = React.createClass({
    handleStart: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleDrag: function (event, ui) {
        console.log('Event: ', event);
    console.log('Position: ', ui.position);
    },

    handleStop: function (event, ui) {
        console.log('Event: ', event);
    console.log('Position: ', ui.position);
    },

    render: function () {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                start={{x: 0, y: 0}}
                grid={[25, 25]}
                zIndex={100}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div>
                    <div className="handle">Drag from here</div>
                    <div>This readme is really dragging on...</div>
                </div>
            </Draggable>
        );
    }
});

export default App
