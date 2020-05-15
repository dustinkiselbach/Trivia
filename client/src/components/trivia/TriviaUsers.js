import React from 'react'
import TriviaUser from './TriviaUser'

const TriviaUsers = ({ roomUsers }) => {
  return (
    <div className='trivia__users'>
      <h1 className='title'>Scoreboard</h1>
      {roomUsers.map(user => (
        <TriviaUser key={user.id} username={user.username} score={user.score} />
      ))}
    </div>
  )
}
export default TriviaUsers
