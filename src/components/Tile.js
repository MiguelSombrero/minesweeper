import React from 'react'
import { FaFlag, FaBomb } from 'react-icons/fa'
import Number from './Number'

const Tile = ({ tile, open, toggleFlag }) => {

  const handleOpen = (event) => {
    open()
  }

  const handleFlag = (event) => {
    event.preventDefault()

    if (!tile.isOpen) {
      toggleFlag()
    }
  }

  if (tile.isOpen && tile.isMine) {
    return (
      <FaBomb />
    )
  }

  if (tile.isFlagged) {
    return (
      <FaFlag
        className='gridItem'
        onContextMenu={(e) => handleFlag(e)}
        style={{ color: 'red', backgroundColor: 'grey' }}
      />
    )
  }

  return (
    <Number
      tile={tile}
      handleFlag={handleFlag}
      handleOpen={handleOpen}
    />
  )
}

export default Tile