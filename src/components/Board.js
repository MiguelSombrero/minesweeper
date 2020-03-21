import React, { useState } from 'react'
import Tile from './Tile'
import { Row, Container, Col } from 'react-bootstrap'
import { cascadeEmptyTiles } from '../services/minesweeperService'

const Board = ({ board, setBoard }) => {
  const [gameOver, setGameOver] = useState(false)

  if (!board) {
    return null
  }

  const openTile = (row, col) => {
    const newBoard = [...board]
    cascadeEmptyTiles(row, col, newBoard)
    setBoard(newBoard)
  }

  const toggleFlag = (row, col) => {
    const newBoard = [...board]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    setBoard(newBoard)
  }

  const handleGameOver = () => setGameOver(true)

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={4}>
          {gameOver ? 'Game over!' : 'Game on!' }
        </Col>
        <Col xs={12} sm={4}>
          time
        </Col>
        <Col xs={12} sm={4}>
          mines
        </Col>
      </Row>
      {board.map((row, i) =>
        <Row key={i} className='board' >
          {row.map((col, j) =>
            <Tile
              key={j}
              tile={col}
              open={() => openTile(i, j)}
              toggleFlag={() => toggleFlag(i, j)}
              setGameOver={() => handleGameOver()}
            />
          )}
        </Row>
      )}
    </Container>
  )
}

export default Board