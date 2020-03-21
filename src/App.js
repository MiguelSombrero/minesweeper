import React, { useState } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import SidePanel from './components/SidePanel'
import Board from './components/Board'
import { createBoardOf } from './services/minesweeperService'
import './App.css'

const App = () => {
  const [board, setBoard] = useState([[]])

  const handleCreateBoard = (rows, cols, mines) => {
    const newBoard = createBoardOf(rows, cols, mines)
    setBoard(newBoard)
  }

  return (
    <Container fluid className='text-center'>
      <Row>
        <Jumbotron as={Col} fluid>
          <h1>Mine Sweeper</h1>
        </Jumbotron>
      </Row>
      <Row>
        <Col xs={12} sm={4}>
          <SidePanel
            handleCreateEasyBoard={() => handleCreateBoard(9, 9, 10)}
            handleCreateMediumBoard={() => handleCreateBoard(16, 16, 40)}
            handleCreateHardBoard={() => handleCreateBoard(30, 16, 99)}
          />
        </Col>
        <Col xs={12} sm={{ span: 7, offset: 1 }}>
          <Board
            board={board}
            setBoard={setBoard}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App