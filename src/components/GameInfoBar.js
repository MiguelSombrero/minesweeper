import React, { useState, useEffect } from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'

const GameInfoBar = ({ start, mines, handleNicknameChange }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime(Math.floor((Date.now() - start) / 1000)))
    clearInterval(timer)
  }, [time])

  return (
    <Row>
      <Col>
        <FormControl
          className='mb-2 mt-2'
          placeholder='Your nickname'
          onChange={handleNicknameChange}
        />
      </Col>
      <Col>
        <p>mines {mines}</p>
      </Col>
      <Col>
        <p>seconds {time}</p>
      </Col>
    </Row>
  )
}

export default GameInfoBar