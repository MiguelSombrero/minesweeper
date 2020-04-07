import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import { isWon } from '../utils/minesweeperUtils'

const Game = ({ game, setGame, handleIsWon , handleShowNotification }) => {
  if (!game) {
    return null
  }

  const handleSetGameOver = () => {
    setGame({ ...game, isOver: true, isOn: false })
    handleShowNotification('Death by mine', true)
  }

  const handleUpdateBoard = board => {
    setGame({ ...game, board, isOn: true })

    if (isWon(game)) {
      handleShowNotification('You won!', false)
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