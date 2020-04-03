import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import { isWon } from '../utils/arrayUtils'

const Game = ({ game, setGame, handleIsWon }) => {
  if (!game) {
    return null
  }

  const handleSetGameOver = () => {
    setGame({ ...game, isOver: true, isOn: false })
  }

  const handleUpdateBoard = board => {
    setGame({ ...game, board, isOn: true })

    if (isWon(game)) {
      handleIsWon()
    }
  }

  return (
    <Row>
      <Col>
        <Board
          board={game.board}
          setGameOver={handleSetGameOver}
          updateBoard={(b) => handleUpdateBoard(b)}
          isOver={game.isOver}
        />
      </Col>
    </Row>
  )
}

export default Game