import React from 'react'

const TriviaUser = ({ username, score }) => {
  return (
    <div className='trivia__user'>
      <h2>{username}</h2>
      <h2>Score: {score}</h2>
    </div>
  )
}

export default TriviaUser
