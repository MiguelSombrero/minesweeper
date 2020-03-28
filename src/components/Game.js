import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Board from './Board'
import GameInfoBar from './GameInfoBar'
import { isWon } from '../utils/arrayUtils'

const Game = ({ game, setGame, time, setTime }) => {

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1)
    }, 1000)

    return () => clearInterval(timer)

  }, [time])

  if (!game) {
    return null
  }

  console.log(game)

  const handleIsWon = async () => {
    try {
      setGame({ ...game, isWon: true, isOn: false })
      console.log('voitit!')

    } catch (exception) {
      console.log('Oops!')
    }
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
        time={time}
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