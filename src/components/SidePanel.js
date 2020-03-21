import React from 'react'
import { Nav } from 'react-bootstrap'
import Button from './Button'

const SidePanel = ({
  handleCreateEasyBoard,
  handleCreateMediumBoard,
  handleCreateHardBoard

}) =>
  <Nav justify className='justify-content-center flex-column'>
    <Nav.Item>
      <Button
        text='Easy 9x9'
        onClick={handleCreateEasyBoard}
      />
    </Nav.Item>
    <Nav.Item>
      <Button
        text='Medium 16x16'
        onClick={handleCreateMediumBoard}
      />
    </Nav.Item>
    <Nav.Item>
      <Button
        text='Hard 30x16'
        onClick={handleCreateHardBoard}
      />
    </Nav.Item>
  </Nav>

export default SidePanel