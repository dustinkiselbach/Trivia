import React, { useEffect } from 'react'

const TriviaTimer = ({ time, setTime }) => {
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  })
  return (
    <div className='trivia__timer'>
      <span className='timer'>{time}</span>
    </div>
  )
}

export default TriviaTimer
