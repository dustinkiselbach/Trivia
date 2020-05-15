import React from 'react'

const TriviaMessages = ({ messages }) => {
  return (
    <div className='trivia__messages'>
      <h2>{messages.text}</h2>
    </div>
  )
}

export default TriviaMessages
