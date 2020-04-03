import React from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'
import Timer from './Timer'

const GameInfoBar = ({ game, handleNicknameChange, time, setTime }) => {

  const handleShowTimer = () => game && game.isOn
    ?
    <Timer
      time={time}
      setTime={setTime}
    />
    : time

  return (
    <Row className='justify-content-center mt-3'>
      <Col xs={12} sm={4} >
        <FormControl
          className='mb-2 mt-2'
          placeholder='Your nickname'
          onChange={handleNicknameChange}
        />

        <p className='float-left'>Mines: {game ? game.mines : 0}</p>
        <p className='float-right'>Seconds: {handleShowTimer()}</p>

      </Col>
    </Row>
  )
}

export default GameInfoBar
