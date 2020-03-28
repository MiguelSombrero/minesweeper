import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OptionsPanel from './components/OptionsPanel'
import Game from './components/Game'
import { createBoardOf } from './utils/arrayUtils'
import { findAll } from './services/minesweeperService'
import './App.css'
import BestOfPanel from './components/BestOfPanel'

const App = () => {
  const [game, setGame] = useState(null)
  const [time, setTime] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {
    handleFindResults()
  }, [])

  const handleFindResults = async () => {
    try {
      const res = await findAll()
      setResults(res)
    } catch (exception) {
      console.log('Ooops!')
    }
  }

  const handleCreateGame = (rows, cols, mines) => {
    const newBoard = createBoardOf(rows, cols, mines)

    const newGame = {
      board: newBoard,
      mines,
      isOver: false,
      isWon: false,
      isOn: false
    }

    setTime(0)
    setGame(newGame)
  }

  const handleSetGame = newGame => {
    setGame(newGame)
  }

  return (
    <Container fluid className='text-center'>
      <Row className='banner'>
        <Col>
          <h1>Mine Sweeper</h1>
          <p>Swipe this to right</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <OptionsPanel
            handleCreateGame={(rows, cols, mines) => handleCreateGame(rows, cols, mines)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4} >
          <h3>Best results</h3>
          <BestOfPanel
            results={results}
          />
        </Col>
        <Col xs={12} sm={8} >
          <Game
            game={game}
            setGame={(g) => handleSetGame(g)}
            time={time}
            setTime={(t) => setTime(t)}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App