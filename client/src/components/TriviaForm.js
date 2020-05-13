import React, { useContext, useState } from 'react'
import TriviaContext from '../context/trivia/triviaContext'

const TriviaForm = props => {
  const triviaContext = useContext(TriviaContext)

  const { getUsername, getRoom } = triviaContext

  const [fields, setFields] = useState({
    username: '',
    room: ''
  })

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    getUsername(fields.username)
    getRoom(fields.room)
    props.history.push('/game')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='username'
          type='text'
          placeholder='username'
          onChange={onChange}
        />
        <input name='room' type='text' placeholder='room' onChange={onChange} />
        <button>go in</button>
      </form>
    </div>
  )
}

export default TriviaForm
