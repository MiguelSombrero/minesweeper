import React, { useState } from 'react'
import { ListGroup, Card, Badge } from 'react-bootstrap'

const ResultList = ({ listItems, title }) => {
  const [visible, setVisible] = useState(5)

  const handleSetVisible = () => setVisible(visible + 5)

  const byTime = (a, b) => a.time - b.time > 0 ? 1 : -1

  const itemsToShow = listItems.sort(byTime).slice(0, visible)

  return (
    <Card className='mb-2 mt-2'>
      <Card.Header>
        <Card.Title className='text-center'>
          {title}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {listItems.length === 0
          ? 'no results yet'
          :
          <ListGroup variant='flush'>
            {itemsToShow.map(item =>
              <ListGroup.Item key={item.id}>
                {item.nickname} <Badge variant='warning' className='float-right'>{item.time}</Badge>
              </ListGroup.Item>
            )}

            {visible < listItems.length &&
            <ListGroup.Item action onClick={handleSetVisible}>
              Show more
            </ListGroup.Item>
            }
          </ListGroup>
        }
      </Card.Body>
    </Card>
  )
}


export default ResultList