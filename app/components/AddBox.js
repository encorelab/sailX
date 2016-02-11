import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (t) => {
    this.setState({
      dataSource: [t, t + t, t + t + t],
    });
  };

  render() {
    return (
      <AutoComplete
        hintText="Type c"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
    );
  }
}



// const fields = [
//   {id: 'title',
//     label: 'Title',
//     type: 'INPUT',
//     required: true},
//     {id: 'content',
//       label: 'Your idea',
//       type: 'TEXTAREA',
//     required: true}
// ]

// const onSubmit = (e) => console.log("Submitted", e)
// const AddBox = () => {
//   return(
//     <div>
// <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#addBoxModal">Open Modal</button>
// <div id='addBoxModal' className='modal fade' role='dialog'>
//     <div className='modal-dialog'>
//     <div className='modal-header'>
//     <h4 className='modal-title'>Add new idea</h4>
//     </div>
//     <div className='modal-body'>
//     <Forms fields={fields} onSubmit={onSubmit} submitButton={{"data-dismiss": "modal"}}/>
//     </div>
//     </div>
//     </div>
//     </div>
//   )}


    
