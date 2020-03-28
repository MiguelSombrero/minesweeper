import React from 'react'
import { Row, Col } from 'react-bootstrap'

const GameInfoBar = ({ time, mines }) => {
  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <p>mines {mines}</p>
        <p>seconds {time}</p>
      </Col>
    </Row>
  )
}

export default GameInfoBar