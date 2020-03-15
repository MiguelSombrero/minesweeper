import React from 'react'

const Button = ({ text, onClick }) => {
  return (
    <input
      className='button m-1'
      type='button'
      value={text}
      onClick={onClick}
    />
  )
}

export default Button