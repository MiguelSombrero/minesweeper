import React from 'react'
import { ListGroup } from 'react-bootstrap'

const ResultList = ({ listItems }) => {

  const byTime = (a, b) => a.time - b.time > 0 ? 1 : -1
  const itemsToShow = listItems.sort(byTime)

  return (
    <ListGroup variant='flush'>
      {itemsToShow.map(item =>
        <ListGroup.Item key={item.id}>
          {item.nickname} {item.time}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
}


export default ResultList