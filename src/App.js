import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OptionsPanel from './components/OptionsPanel'
import Game from './components/Game'
import { createBoardOf } from './utils/minesweeperUtils'
import service from './services/minesweeperService'
import './App.css'
import SidePanel from './components/SidePanel'
import GameInfoBar from './components/GameInfoBar'
import StatusPanel from './components/StatusPanel'

const App = () => {
  const [game, setGame] = useState(null)
  const [nickname, setNickname] = useState('')
  const [time, setTime] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {
    handleFindResults()
  }, [])

  const handleFindResults = async () => {
    try {
      const res = await service.findAll()
      setResults(res)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleCreateGame = (rows, cols, mines, difficulty) => {
    const board = createBoardOf(rows, cols, mines)

    const newGame = {
      board,
      mines,
      difficulty,
      isOver: false,
      isWon: false,
      isOn: false
    }

    setTime(0)
    setGame(newGame)
  }

  const handleIsWon = async () => {
    try {
      setGame({ ...game, isWon: true, isOn: false })

      const result = {
        nickname: nickname === '' ? 'Anonymous' : nickname,
        difficulty: game.difficulty,
        time
      }

      const savedResult = await service.create(result)
      setResults(results.concat(savedResult))

    } catch (exception) {
      console.log(exception)
    }
  }

  const handleSetGame = game => setGame(game)
  const handleSetTime = time => setTime(time)
  const handleNicknameChange = event => setNickname(event.target.value)

  return (
    <Container fluid className='text-center'>
      <Row className='banner'>
        <Col>
          <h1>Minesweeper</h1>
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
          <GameInfoBar
            game={game}
            time={time}
            setTime={(time) => handleSetTime(time)}
            handleNicknameChange={handleNicknameChange}
          />
          <StatusPanel
            game={game}
          />
          <Game
            game={game}
            setGame={(game) => handleSetGame(game)}
            handleIsWon={handleIsWon}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App