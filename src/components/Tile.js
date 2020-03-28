import React from 'react'
import { FaFlag, FaBomb } from 'react-icons/fa'

const Tile = ({ tile, open, toggleFlag }) => {

  const setColor = () => {
    switch(tile.value) {
    case 0:
      return 'whitesmoke'
    case 1:
      return 'green'
    case 2:
      return 'orange'
    case 3:
      return 'red'
    case 4:
      return 'purple'
    default:
      return 'black'
    }
  }

  const closedStyle = {
    color: setColor()
  }

  const openStyle = {
    backgroundColor: 'whitesmoke',
    color: setColor()
  }

  const handleOpen = (event) => {
    open()
  }

  const handleFlag = (event) => {
    event.preventDefault()

    if (!tile.isOpen) {
      toggleFlag()
    }
  }

  if (tile.isFlagged) {
    return (
      <div
        className='tile'
        onContextMenu={(e) => handleFlag(e)}
      >
        <FaFlag style={{ color: 'red', backgroundColor: 'grey' }} />
      </div>
    )
  }

  if (tile.isOpen && tile.isMine) {
    return (
      <FaBomb />
    )
  }

  return (
    <div
      className='tile'
      style={tile.isOpen ? openStyle : closedStyle}
      onClick={handleOpen}
      onContextMenu={(e) => handleFlag(e)}
    >
      {tile.isOpen && tile.value !== 0
        ? tile.value
        : ''
      }
    </div>
  )
}

export default Tile