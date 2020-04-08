import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import { isWon } from '../utils/minesweeperUtils'

const Game = ({ game, setGame, handleShowSaveResultDialog , handleShowNotification }) => {
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
      setGame({ ...game, isWon: true, isOn: false })
      handleShowSaveResultDialog()
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