import React from 'react'
import { Nav } from 'react-bootstrap'
import Button from './Button'

const OptionsPanel = ({ handleCreateGame }) =>
  <Nav className='justify-content-center'>
    <Nav.Item>
      <Button
        text='Easy 9x9'
        onClick={() => handleCreateGame(9, 9, 10)}
      />
    </Nav.Item>
    <Nav.Item>
      <Button
        text='Medium 16x16'
        onClick={() => handleCreateGame(16, 16, 40)}
      />
    </Nav.Item>
    <Nav.Item>
      <Button
        text='Hard 16x30'
        onClick={() => handleCreateGame(16, 30, 99)}
      />
    </Nav.Item>
  </Nav>

export default OptionsPanel