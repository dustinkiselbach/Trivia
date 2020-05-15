import React, { useContext, useState } from 'react'
import randomize from 'randomatic'
import TriviaContext from '../../context/trivia/triviaContext'

const Rooms = ({ history }) => {
  const triviaContext = useContext(TriviaContext)
  const { username, getRoom } = triviaContext

  const [newRoom] = useState(randomize('A', 4))

  const onClickCreate = () => {
    getRoom(newRoom)
    history.push('/game')
  }

  const onClickJoin = () => {
    history.push('/joinroom')
  }

  return (
    <section className='rooms'>
      <div className='rooms__greeting'>
        <h1 className='title'>Welcome {username}</h1>
        <h2 className='rooms__info'>you can create a room or join a room</h2>
      </div>
      <div className='rooms__choices'>
        <div className='rooms__choices--create' onClick={onClickCreate}>
          <h2>
            Create room with roomcode <span>{newRoom}</span>
          </h2>
        </div>
        <div className='rooms__choices--join' onClick={onClickJoin}>
          <h2>Join a friend's room</h2>
        </div>
      </div>
    </section>
  )
}

export default Rooms
