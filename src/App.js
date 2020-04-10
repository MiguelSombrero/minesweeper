import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OptionsPanel from './components/OptionsPanel'
import Game from './components/Game'
import { createBoardOf } from './utils/minesweeperUtils'
import service from './services/minesweeperService'
import SidePanel from './components/SidePanel'
import GameInfoBar from './components/GameInfoBar'
import Notification from './components/Notification'
import SaveResultDialog from './components/SaveResultDialog'

import './App.css'

const App = () => {
  const [notification, setNotification] = useState({ message: '', isError: false })
  const [showSaveResultDialog, setShowSaveResultDialog] = useState(false)
  const [game, setGame] = useState(null)
  const [nickname, setNickname] = useState('')
  const [time, setTime] = useState(0)
  const [results, setResults] = useState([])

  useEffect(() => {
    handleFindResults()
  }, [])

  const handleShowNotification = (message, isError) => {
    setNotification({ message, isError })

    setTimeout(() => {
      setNotification({ message: '', isError: false })
    }, 3000)
  }

  const handleFindResults = async () => {
    try {
      const res = await service.findAll()
      setResults(res)
    } catch (exception) {
      console.log(exception)
      handleShowNotification('Error when Fetching results, is server up?', true)
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

  const handleSaveResult = async () => {
    handleCloseSaveResultDialog()

    const result = {
      nickname: nickname === '' ? 'Anonymous' : nickname,
      difficulty: game.difficulty,
      time
    }

    try {
      const savedResult = await service.create(result)
      setResults(results.concat(savedResult))

    } catch (exception) {
      console.log(exception)
      handleShowNotification('Error when saving result, is server up?', true)
    }
  }

  const handleSetGame = game => setGame(game)
  const handleSetTime = time => setTime(time)
  const handleNicknameChange = event => setNickname(event.target.value)
  const handleCloseSaveResultDialog = () => setShowSaveResultDialog(false)
  const handleShowSaveResultDialog = () => setShowSaveResultDialog(true)

  return (
    <Container fluid>
      <Row className='banner'>
        <Col>
          <h1 className='text-center'>Minesweeper</h1>
        </Col>
      </Row>
      <Notification
        notification={notification}
      />
      <SaveResultDialog
        show={showSaveResultDialog}
        handleNicknameChange={handleNicknameChange}
        handleSaveResult={handleSaveResult}
        handleClose={handleCloseSaveResultDialog}
        time={time}
      />
      <Row>
        <Col xs={12} sm={3} style={{ backgroundColor: 'antiquewhite' }}>
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
          />
          <Game
            game={game}
            handleSetGame={handleSetGame}
            handleShowSaveResultDialog={handleShowSaveResultDialog}
            handleShowNotification={handleShowNotification}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App