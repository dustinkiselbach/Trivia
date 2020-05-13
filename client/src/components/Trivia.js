import React, { useState, useEffect, useContext } from 'react'
import TriviaContext from '../context/trivia/triviaContext'

function Trivia () {
  const triviaContext = useContext(TriviaContext)

  const { socket, username, room } = triviaContext

  const [messages, setMessages] = useState('')

  const [score, setScore] = useState(0)

  const [questions, setQuestions] = useState([])

  const [gameRoom, setGameRoom] = useState([])

  const [field, setField] = useState('')

  useEffect(() => {
    socket.emit('joinRoom', { username, room })

    // Getting room users
    socket.on('roomUsers', ({ room, users }) => {
      setGameRoom(users)
    })

    // setting Messages
    socket.on('message', message => {
      setMessages(message)
    })

    // Setting questions
    socket.on('question', question => {
      setQuestions(questions => [...questions, question])
    })

    return () => console.log('unmount')
  }, [])

  useEffect(() => {
    socket.emit('updateScore', score)
  }, [score])

  const onChange = e => {
    setField(e.target.value)
  }

  console.log(questions)

  const onSubmit = e => {
    e.preventDefault()

    // get message text
    const msg = field

    // emit message to server
    socket.emit('chatMessage', msg)

    // game has started
    if (questions.length > 0) {
      if (
        questions.slice(-1)[0].data.correct_answer.toLowerCase() ===
        msg.toLowerCase()
      ) {
        setScore(score + 1)
      } else {
        alert('incorrect' + questions.slice(-1)[0].data.correct_answer)
      }
    }

    // clear fields
    setField('')
  }

  const gameStart = () => {
    socket.emit('gameStart')
  }

  console.log(gameRoom)

  return (
    <div className='App'>
      <h1>{room}</h1>
      <h2>{username}</h2>
      <form onSubmit={onSubmit}>
        <input type='text' name='text' onChange={onChange} value={field} />
        <button>Send</button>
      </form>
      <h1>
        {messages.username}, {messages.text}, {messages.time}
      </h1>
      {questions.length > 0 && <h1>{questions.slice(-1)[0].data.question}</h1>}
      <button onClick={gameStart}>Start game</button>
      <h3>{score}</h3>
      {gameRoom.length > 0 &&
        gameRoom.map(user => (
          <h4>
            {user.username}, {user.score}
          </h4>
        ))}
    </div>
  )
}

export default Trivia
