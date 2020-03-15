import React, { useState } from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import SidePanel from './components/SidePanel'
import Board from './components/Board'

import './App.css'

/**
 * EXPLANATIONS
 *
 * M: Mine
 * F: Flag
 * 0-8: Number of surrounding mines
 *
 */
const App = () => {
  const [board, setBoard] = useState([[]])

  const handleCreateEasyBoard = () => {
    createBoardOf(9, 9, 10)
  }

  const handleCreateMediumBoard = () => {
    createBoardOf(16, 16, 40)
  }

  const handleCreateHardBoard = () => {
    createBoardOf(30, 16, 99)
  }

  const createBoardOf = (rows, cols, mines) => {
    const newBoard = initializeArray(rows, cols)
    initializeMines(rows, cols, mines, newBoard)
    setBoard(newBoard)
  }

  const initializeArray = (rows, cols) =>
    Array.from({ length: rows },
      () => Array.from({ length: cols }, () => 0))

  const initializeMines = (rows, cols, mines, board) => {
    let minesLeft = mines

    while (minesLeft > 0) {
      let row = Math.floor(Math.random() * rows)
      let col = Math.floor(Math.random() * cols)

      if (board[row][col] !== 'M') {
        board[row][col] = 'M'
        updateAdjacentMinesCount(row, col, board)
        minesLeft -= 1
      }
    }
  }

  const updateAdjacentMinesCount = (i, j, board) => {
    try {
      if (i > 0 && j > 0 && board[i - 1][j - 1] !== 'M') board[i - 1][j - 1] += 1
      if (i < board.length-1 && j < board[0].length-1 && board[i + 1][j + 1] !== 'M') board[i + 1][j + 1] += 1
      if (i > 0 && j < board[0].length-1 && board[i - 1][j + 1] !== 'M') board[i - 1][j + 1] += 1
      if (i < board.length-1 && j > 0 && board[i + 1][j - 1] !== 'M') board[i + 1][j - 1] += 1

      if (i > 0 && board[i - 1][j] !== 'M') board[i - 1][j] += 1
      if (i < board.length-1 && board[i + 1][j] !== 'M') board[i + 1][j] += 1
      if (j < board[0].length-1 && board[i][j + 1] !== 'M') board[i][j + 1] += 1
      if (j > 0 && board[i][j - 1] !== 'M') board[i][j - 1] += 1

    } catch (exception) {
      console.log(exception)
    }
  }

  const indexOutOfBounds = (row, col, board) =>
    (row < 0 || col < 0 || row > board.length || col > board[0].length)
      ? false
      : true

  return (
    <Container fluid className='text-center'>
      <Row>
        <Jumbotron as={Col} fluid>
          <h1>Mine Sweeper</h1>
        </Jumbotron>
      </Row>
      <Row>
        <Col xs={12} md={4} >
          <SidePanel
            handleCreateEasyBoard={handleCreateEasyBoard}
            handleCreateMediumBoard={handleCreateMediumBoard}
            handleCreateHardBoard={handleCreateHardBoard}
          />
        </Col>
        <Col xs={12} md={8}>
          <Board
            board={board}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
