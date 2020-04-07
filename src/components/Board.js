import React from 'react'
import ClosedTile from './ClosedTile'
import { cascadeEmptyTiles, indexOutOfRange, isFlag, isMine, toggleFlag, notEnoughFlags } from '../utils/minesweeperUtils'
import OpenTile from './OpenTile'

const Board = ({ board, isOver, setGameOver, updateBoard }) => {
  if (!board) {
    return null
  }

  const openTile = (row, col) => {
    if (!isOver && !indexOutOfRange(row, col, board) && !isFlag(row, col, board)) {
      if (isMine(row, col, board) ) {
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

  const handleFlag = (row, col) => {
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
        row.map((tile, j) =>
          tile.isOpen ?
            <OpenTile
              key={j}
              tile={tile}
              openAdjacentTiles={() => openAdjacentTiles(i, j)}
            />
            :
            <ClosedTile
              key={j}
              tile={tile}
              open={() => openTile(i, j)}
              toggleFlag={() => handleFlag(i, j)}
            />
        )
      )}
    </div>
  )
}

export default Board