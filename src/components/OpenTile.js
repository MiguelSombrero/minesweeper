import React from 'react'
import { FaBomb } from 'react-icons/fa'
import Number from './Number'

const OpenTile = ({ tile, openAdjacentTiles }) => {

  if (tile.isMine) {
    return (
      <FaBomb />
    )
  }

  return (
    <Number
      value={tile.value}
      handleClick={openAdjacentTiles}
    />
  )
}

export default OpenTile