import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Timer from './Timer'

const GameInfoBar = ({ game, time, setTime }) => {
  if (!game) {
    return null
  }

  const flagsReducer = (sum, current) => sum + current.filter(tile => tile.isFlagged).length

  const flags = game.board.reduce(flagsReducer, 0)

  const handleShowTimer = () => game.isOn ?
    <Timer
      time={time}
      setTime={setTime}
      isOn={game.isOn}
    />
    : time

  return (
    <Row className='justify-content-center mt-3'>
      <Col xs={12} sm={4} >
        <h6 className='float-left'>
          Mines: {game.mines - flags}
        </h6>

        <h6 className='float-right'>
          Seconds: {handleShowTimer()}
        </h6>

      </Col>
    </Row>
  )
}

export default GameInfoBar
