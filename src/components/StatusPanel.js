import React from 'react'
import { Row, Col } from 'react-bootstrap'

const StatusPanel = ({ game }) => {
  if (!game) {
    return null
  }

  const style = {
    minHeight: '35px',
    width: '100%',
    color: game.isWon ? 'green' : 'red'
  }

  return (
    <Row style={style}>
      <Col>
        {game.isOver &&
          <h3>Death by mine!</h3>
        }
        {game.isWon &&
          <h3>You Won!</h3>
        }
      </Col>
    </Row>
  )
}

export default StatusPanel