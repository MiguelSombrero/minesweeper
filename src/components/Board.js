import React from 'react'
import Tile from './Tile'
import { cascadeEmptyTiles } from '../utils/arrayUtils'

const Board = ({ board, isOver, setGameOver, updateBoard }) => {
  if (!board) {
    return null
  }

  const openTile = (row, col) => {
    if (!isOver) {
      if (isMine(row, col, board)) {
        endGame(row, col)
        return
      }

      const newBoard = [...board]
      cascadeEmptyTiles(row, col, newBoard)
      updateBoard(newBoard)
    }
  }

  const isMine = (row, col, board) => board[row][col].isMine

  const endGame = (row, col) => {
    board[row][col].isOpen = true
    setGameOver()
  }

  const toggleFlag = (row, col) => {
    if (!isOver) {
      const newBoard = [...board]
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
      updateBoard(newBoard)
    }
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${board[0].length}, 1.5rem)`,
    gridTemplateRows: `repeat(${board.length}, 1.5rem)`,
    alignItems: 'center',
    textAlign: 'center',
    justifyItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={gridStyle} >
      {board.map((row, i) =>
        row.map((col, j) =>
          <Tile
            key={j}
            tile={col}
            open={() => openTile(i, j)}
            toggleFlag={() => toggleFlag(i, j)}
          />
        )
      )}
    </div>
  )
}

export default Board