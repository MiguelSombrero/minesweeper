import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import GameInfoBar from './GameInfoBar'
import { isWon } from '../utils/arrayUtils'

const Game = ({ game, setGame, handleIsWon }) => {
  if (!game) {
    return null
  }

  console.log(game)

  const handleSetGameOver = () => {
    setGame({ ...game, isOver: true, isOn: false })
  }

  const handleUpdateBoard = board => {
    setGame({ ...game, board, isOn: true, startTime: game.startTime === null ? Date.now() : game.startTime })

    if (isWon(game)) {
      handleIsWon()
    }
  }

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
      <GameInfoBar
        start={game.startTime}
        mines={game.mines}
      />
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
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