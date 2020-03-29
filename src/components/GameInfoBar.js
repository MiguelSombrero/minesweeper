import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const GameInfoBar = ({ start, mines }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(Math.floor((Date.now() - start) / 1000)))
    clearInterval(timer)
  }, [time])

  if (!start) {
    return null
  }

  console.log(time)

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