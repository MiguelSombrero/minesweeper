import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'

const Game = ({ game, setGame }) => {
  const [timer, setTimer] = useState(0)

  if (!game) {
    return null
  }

  const handleSetGameOver = () => {
    setGame({ ...game, isOver: true })
  }

  const handleUpdateBoard = board => {
    setGame({ ...game, board })

    if (isWon()) {
      setGame({ ...game, isWon: true })
    }
  }

  const isWon = () => {
    const a = game.board.filter(row => !isEmptyArray(
      row.filter(isClosedNonMinedTile))
    )

    return isEmptyArray(a)
  }

  const isEmptyArray = array => array.length === 0
  const isClosedNonMinedTile = tile => !tile.isOpen && !tile.isMine

  return (
    <>
      <Row>
        <Col>
          {game.isOver &&
            <h3>You lost!</h3>
          }
          {game.isWon &&
            <h3>You Won!</h3>
          }
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p>mines {game.mines}</p>
          <p>seconds {timer}</p>
          <Board
            board={game.board}
            setGameOver={handleSetGameOver}
            updateBoard={(b) => handleUpdateBoard(b)}
            isOver={game.isOver}
          />
        </Col>
      </Row>
    </>
  )
}

export default Game