import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

class Modals extends React.Component {
  render () {
    const props = this.props.modalProps;
    const onClose = this.props.onClose;

    return(
    <Modal
      open={props.open}
      onClose={onClose}
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content className="modal-content">
        <Button content="Cancel" onClick={onClose} />
        <Button content={props.content} onClick={props.onFunction} />
      </Modal.Content>
    </Modal>
    );
  }
}

export default Modals