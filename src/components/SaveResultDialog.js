import React from 'react'
import { Modal, Form } from 'react-bootstrap'
import Button from './Button'

const SaveResultDialog = ({
  show,
  handleClose,
  handleNicknameChange,
  handleSaveResult,
  time
}) => {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          Whohoo - you won!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Your time was {time} seconds (not good, not bad)</h6>
        <Form.Label>
          Give a nickname, if you want to save your result:
        </Form.Label>
        <Form.Control
          className='mb-2 mt-2'
          placeholder='Your nickname'
          onChange={handleNicknameChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          text='Save result'
          onClick={handleSaveResult}
        />
        <Button
          text='No thanks'
          onClick={handleClose}
        />
      </Modal.Footer>
    </Modal>
  )
}

export default SaveResultDialog