import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

class Modals extends React.Component
{
  render () {
    return(

    <Modal
      open={this.props.open}
      onClose={this.props.onModalClose}
    >
      <Modal.Header>{this.props.title}</Modal.Header>
      <Modal.Content className="modal-content">
        <Button content="Cancel" onClick={() => this.props.onModalClose()} />
        <Button content="Reset" onClick={() => this.props.onReset()} />
      </Modal.Content>
    </Modal>
    );
  }
}

export default Modals