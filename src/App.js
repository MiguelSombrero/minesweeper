import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SidePanel from './components/SidePanel'
import Game from './components/Game'
import { createBoardOf } from './utils/arrayUtils'
import { findAll } from './services/minesweeperService'
import './App.css'

const App = () => {
  const [game, setGame] = useState(null)
  const [results, setResults] = useState([])

  useEffect(() => {
    handleFindResults()
  }, [])

  const handleFindResults = async () => {
    try {
      const res = await findAll()
      setResults(res._embedded.minesweepers)
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
      isWon: false
    }

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
      <h2>Select game difficulty</h2>
      <SidePanel
        handleCreateGame={(rows, cols, mines) => handleCreateGame(rows, cols, mines)}
      />
      <Game
        game={game}
        setGame={(g) => handleSetGame(g)}
      />
    </Container>
  )
}

export default App