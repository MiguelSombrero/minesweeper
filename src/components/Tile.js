import React, { useState } from 'react'
import { FaFlag, FaBomb } from 'react-icons/fa'

const Tile = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFlagged, setIsFlagged] = useState(false)

  const setColor = () => {
    switch(value) {
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
    border: '1px solid lightgrey',
    backgroundColor: 'grey',
    color: setColor,
    height: '25px',
    width: '100%',
    clear: 'both'
  }

  const openStyle = {
    border: '1px solid lightgrey',
    backgroundColor: 'whitesmoke',
    text: 'muted',
    color: setColor(),
    height: '25px',
    width: '100%',
    clear: 'both'
  }

  const handleIsOpen = () => setIsOpen(true)
  const handleToggleFlagged = () => setIsFlagged(!isFlagged)

  const handleMouseClick = (event) => {
    switch (event.button) {
    case 0:
      handleIsOpen()
      break
    case 2:
      handleToggleFlagged()
      break
    default:
      console.log(`unknown button pressed ${event.button}`)
    }
  }

  if (isFlagged) {
    return (
      <FaFlag style={{ color: 'red' }} />
    )
  }

  if (isOpen && value === 'M') {
    return (
      <FaBomb />
    )
  }

  return (
    <div
      style={isOpen ? openStyle : closedStyle}
      onClick={handleMouseClick}
    >
      {isOpen
        ? value
        : ''
      }
    </div>
  )
}

export default Tile