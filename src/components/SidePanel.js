import React from 'react'
import { Nav } from 'react-bootstrap'
import Button from './Button'

const SidePanel = ({
  handleCreateEasyBoard,
  handleCreateMediumBoard,
  handleCreateHardBoard

}) =>
  <Nav className='flex-column'>
    <Button
      text='Easy 9x9'
      onClick={handleCreateEasyBoard}
    />
    <Button
      text='Medium 16x16'
      onClick={handleCreateMediumBoard}
    />
    <Button
      text='Hard 30x16'
      onClick={handleCreateHardBoard}
    />
  </Nav>

export default SidePanel