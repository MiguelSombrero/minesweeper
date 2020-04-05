import React from 'react'

const Number = ({ tile, handleOpen, handleFlag }) => {

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

  return (
    <div
      className='gridItem'
      style={{ color: `${setColor()}`, backgroundColor: tile.isOpen ? 'whitesmoke' : 'grey' }}
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

export default Number