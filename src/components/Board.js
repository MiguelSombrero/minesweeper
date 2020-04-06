import React from 'react'
import Tile from './Tile'
import { cascadeEmptyTiles, indexOutOfRange, isFlag, isMine, toggleFlag, notEnoughFlags } from '../utils/minesweeperUtils'

const Board = ({ board, isOver, setGameOver, updateBoard }) => {
  if (!board) {
    return null
  }

  const openTile = (row, col) => {
    if (!isOver && !indexOutOfRange(row, col, board)) {
      if (isMine(row, col, board) && !isFlag(row, col, board)) {
        board[row][col].isOpen = true
        setGameOver()
        return
      }

      cascadeEmptyTiles(row, col, board)
      updateBoard(board)
    }
  }

  const openAdjacentTiles = (row, col) => {
    if (notEnoughFlags(row, col, board)) {
      return
    }

    openTile(row - 1, col - 1)
    openTile(row + 1, col + 1)
    openTile(row + 1, col - 1)
    openTile(row - 1, col + 1)

    openTile(row - 1, col)
    openTile(row + 1, col)
    openTile(row, col - 1)
    openTile(row, col + 1)
  }

  const flag = (row, col) => {
    if (!isOver) {
      toggleFlag(row, col, board)
      updateBoard(board)
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
            openAdjacentTiles={() => openAdjacentTiles(i, j)}
            open={() => openTile(i, j)}
            toggleFlag={() => flag(i, j)}
          />
        )
      )}
    </div>
  )
}

export default Board