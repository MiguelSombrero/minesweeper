import React from 'react'
import ResultList from './ResultList'
import { Card } from 'react-bootstrap'

const BestOfPanel = ({ results }) => {

  return (
    <Card>
      <h4>Easy</h4>
      <ResultList
        listItems={results.filter(r => r.difficulty === 'easy')}
      />

      <h4>Medium</h4>
      <ResultList
        listItems={results.filter(r => r.difficulty === 'medium')}
      />

      <h4>Hard</h4>
      <ResultList
        listItems={results.filter(r => r.difficulty === 'hard')}
      />
    </Card>
  )
}

export default BestOfPanel