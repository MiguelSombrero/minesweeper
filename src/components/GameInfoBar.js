import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Timer from './Timer'

const GameInfoBar = ({ game, time, setTime }) => {

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
        <h6 className='float-left'>
          Mines: {game ? game.mines : 0}
        </h6>

        <h6 className='float-right'>
          Seconds: {handleShowTimer()}
        </h6>

      </Col>
    </Row>
  )
}

export default GameInfoBar
