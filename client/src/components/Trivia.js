import React, { useState, useEffect, useContext } from 'react'
import TriviaContext from '../context/trivia/triviaContext'
const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()

function Trivia () {
  const triviaContext = useContext(TriviaContext)
  const { socket, username, room } = triviaContext

  // Getting messages from socket
  const [messages, setMessages] = useState('')
  // Keeping score of correct answers
  const [score, setScore] = useState(0)
  // Keeping array of questions
  const [questions, setQuestions] = useState([])
  // keeping track who is in the room
  const [gameRoom, setGameRoom] = useState([])
  // getting user input
  const [field, setField] = useState('')
  // setting a message if the answer is right or wrong
  const [alert, setAlert] = useState(null)

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

  const onSubmit = e => {
    e.preventDefault()

    // get message text
    const msg = field

    // emit message to server
    // socket.emit('chatMessage', msg)

    // game has started
    if (questions.length > 0) {
      if (
        questions.slice(-1)[0].correct_answer.toLowerCase() ===
        msg.toLowerCase()
      ) {
        setScore(score + 1)
        setAlert('correct')
      } else {
        // alert('incorrect' + questions.slice(-1)[0].correct_answer)
        setAlert('incorrect')
      }
    }

    // clear fields
    setField('')
  }

  const gameStart = () => {
    socket.emit('gameStart')
  }

  // check if a certain amount of questions have been played
  if (questions.length >= 11) {
    // Its not going to do it once its going to do it continously
    setTimeout(() => {
      socket.emit('gameEnd')
      setQuestions([])
      setScore(0)
    }, 3000)
  }

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
      {questions.length > 0 && (
        <h1>{entities.decode(questions.slice(-1)[0].question)}</h1>
      )}
      <button onClick={gameStart} disabled={questions.length >= 11}>
        {questions.length === 0 ? 'Start game' : 'next question'}
      </button>
      {alert && <div>{alert}</div>}
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
