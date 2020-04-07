import React from 'react'
import { FaFlag } from 'react-icons/fa'

const ClosedTile = ({ tile, open, toggleFlag }) => {

  const handleFlag = (event) => {
    event.preventDefault()
    toggleFlag()
  }

  if (tile.isFlagged) {
    return (
      <FaFlag
        className='gridItem'
        onContextMenu={handleFlag}
        style={{ color: 'red', backgroundColor: 'grey' }}
      />
    )
  }

  return (
    <div
      className='gridItem'
      onClick={open}
      onContextMenu={handleFlag}
    >
    </div>
  )
}

export default ClosedTile