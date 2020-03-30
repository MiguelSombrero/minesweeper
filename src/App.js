import React, { useState, useEffect } from 'react'
import { Container, Row, Col, FormControl } from 'react-bootstrap'
import OptionsPanel from './components/OptionsPanel'
import Game from './components/Game'
import { createBoardOf } from './utils/arrayUtils'
import service from './services/minesweeperService'
import './App.css'
import SidePanel from './components/SidePanel'

const App = () => {
  const [game, setGame] = useState(null)
  const [nickname, setNickname] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    handleFindResults()
  }, [])

  const handleFindResults = async () => {
    try {
      const res = await service.findAll()
      setResults(res)
    } catch (exception) {
      console.log('Ooops!')
    }
  }

  const handleCreateGame = (rows, cols, mines, difficulty) => {
    const newBoard = createBoardOf(rows, cols, mines)

    const newGame = {
      board: newBoard,
      mines,
      difficulty,
      isOver: false,
      isWon: false,
      isOn: false,
      startTime: null
    }

    setGame(newGame)
  }

  const handleIsWon = async () => {
    try {
      setGame({ ...game, isWon: true, isOn: false })

      const result = {
        nickname: nickname === '' ? 'Anonymous' : nickname,
        difficulty: game.difficulty,
        time: Math.floor((Date.now() - game.startTime) / 1000)
      }

      const savedResult = await service.create(result)
      setResults(results.concat(savedResult))

    } catch (exception) {
      console.log('Oops!')
    }
  }


  const handleSetGame = newGame => {
    setGame(newGame)
  }

  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
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
        <Col xs={12} sm={3} >
          <SidePanel
            results={results}
          />
        </Col>
        <Col xs={12} sm={9} >
          <OptionsPanel
            handleCreateGame={(rows, cols, mines, difficulty) =>
              handleCreateGame(rows, cols, mines, difficulty)
            }
          />
          <Game
            game={game}
            setGame={(g) => handleSetGame(g)}
            handleIsWon={handleIsWon}
            handleNicknameChange={handleNicknameChange}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App