import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null
  }

  return (
    <Row>
      <Col className='notification' style={{ backgroundColor: notification.isError ? 'red' : 'green' }}>
        <h2>{notification.message}</h2>
      </Col>
    </Row>
  )
}

export default Notification