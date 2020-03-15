import React from 'react'
import Tile from './Tile'

const Board = ({ board }) => {
  if (!board) {
    return null
  }

  return (
    board.map((row, i) =>
      <div key={i} className='board' >
        {row.map((col, j) =>
          <Tile
            key={j}
            value={col}
          />
        )}
      </div>
    )
  )
}

export default Board