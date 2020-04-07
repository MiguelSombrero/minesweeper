import React from 'react'

const Number = ({ value, handleClick }) => {

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

  return (
    <div
      className='gridItem'
      style={{ color: `${setColor()}`, backgroundColor: 'whitesmoke' }}
      onClick={handleClick}
    >
      {value === 0 ? '' : value}
    </div>
  )
}

export default Number