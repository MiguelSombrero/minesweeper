import React from 'react'
import ClosedTile from './ClosedTile'
import { openAdjacentTilesAndIsMine, openTileAndIsMine, toggleFlag, enoughFlags } from '../utils/minesweeperUtils'
import OpenTile from './OpenTile'

const Board = ({
  board,
  gameOver,
  handleSetGameOver,
  handleUpdateGame
}) => {

  if (!board) {
    return null
  }

  const openTile = (row, col) => {
    if (gameOver()) {
      return
    }

    const newBoard = [...board]

    openTileAndIsMine(row, col, newBoard)
      ? handleSetGameOver()
      : handleUpdateGame(newBoard)
  }

  const openAdjacentTiles = (row, col) => {
    if (gameOver() || !enoughFlags(row, col, board)) {
      return
    }

    const newBoard = [...board]

    openAdjacentTilesAndIsMine(row, col, newBoard)
      ? handleSetGameOver()
      : handleUpdateGame(newBoard)
  }

  const handleFlag = (row, col) => {
    if (gameOver()) {
      return
    }
    const newBoard = [...board]
    toggleFlag(row, col, newBoard)
    handleUpdateGame(newBoard)
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