import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'

const ResultList = ({ listItems }) => {
  const [visible, setVisible] = useState(5)

  const byTime = (a, b) => a.time - b.time > 0 ? 1 : -1
  const itemsToShow = listItems.sort(byTime).slice(0, visible)

  const handleSetVisible = () => setVisible(visible + 5)

  return (
    <ListGroup variant='flush'>
      {itemsToShow.map(item =>
        <ListGroup.Item key={item.id}>
          {item.nickname} {item.time}
        </ListGroup.Item>
      )}
      <ListGroup.Item action onClick={handleSetVisible}>
        Show more results
      </ListGroup.Item>
    </ListGroup>
  )
}


export default ResultList