import React from 'react'
import ResultList from './ResultList'

const SidePanel = ({ results }) =>
  <>
    <h3 className='text-center'>Best Results</h3>

    <ResultList
      title='Easy'
      listItems={results.filter(r => r.difficulty === 'easy')}
    />

    <ResultList
      title='Medium'
      listItems={results.filter(r => r.difficulty === 'medium')}
    />

    <ResultList
      title='Hard'
      listItems={results.filter(r => r.difficulty === 'hard')}
    />
  </>

export default SidePanel