import React from 'react'

const TriviaHeader = ({ username, room, score }) => {
  return (
    <div className='trivia__header'>
      <div className='trivia__header--room'>
        <h2 className='title'>
          {username}'s score: {score}
        </h2>
      </div>
      <div className='trivia__header--username'>
        <h3>
          Room Code: <span>{room}</span>
        </h3>
      </div>
    </div>
  )
}

export default TriviaHeader
