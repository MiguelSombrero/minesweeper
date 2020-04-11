import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import { isWon } from '../utils/minesweeperUtils'

const Game = ({
  game,
  handleSetGame,
  handleShowSaveResultDialog,
  handleShowNotification
}) => {

  if (!game) {
    return null
  }

  const gameOver = () => game.isOver || game.isWon

  const handleSetGameOver = () => {
    handleSetGame({ ...game, isOver: true, isOn: false })
    handleShowNotification('Death by mine', true)
  }

  const handleUpdateGame = board => {
    handleSetGame({ ...game, board, isOn: true })

    if (isWon(board)) {
      handleSetGame({ ...game, isWon: true, isOn: false })
      handleShowSaveResultDialog()
    }
  }

  return (
    <Row>
      <Col>
        <Board
          board={game.board}
          handleSetGameOver={handleSetGameOver}
          handleUpdateGame={(b) => handleUpdateGame(b)}
          gameOver={gameOver}
        />
      </Col>
    </Row>
  )
}

export default Game