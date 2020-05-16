import React, { useState, useEffect, useContext } from 'react'
import TriviaContext from '../../context/trivia/triviaContext'
import TriviaHeader from './TriviaHeader'
import TriviaUsers from './TriviaUsers'
import TriviaMessages from './TriviaMessages'
import TriviaQuestion from './TriviaQuestion'
import TrivaTimer from './TriviaTimer'
const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()

const Trivia = ({ history }) => {
  const triviaContext = useContext(TriviaContext)
  const { socket, username, room, leaveRoom } = triviaContext

  // Getting messages from socket
  const [messages, setMessages] = useState('')
  // Keeping score of correct answers
  const [score, setScore] = useState(0)
  // Keeping array of questions
  const [questions, setQuestions] = useState([])
  // keeping track who is in the room
  const [roomUsers, setRoomUsers] = useState([])
  // getting user input
  const [userAnswer, setUserAnswer] = useState('')
  // setting a message if the answer is right or wrong
  const [alert, setAlert] = useState(null)
  // boolean to check whether current question has been answer
  const [answered, setAnswered] = useState(false)
  // timer state
  const [time, setTime] = useState(null)

  useEffect(() => {
    // setting room TODO allow room and username to persist to localhost
    // for now should kick you out when you refresh?
    socket.connect()

    socket.emit('joinRoom', { username, room })
    // Getting room users
    socket.on('roomUsers', ({ room, users }) => {
      setRoomUsers(users)
      console.log(room, users)
    })

    // setting Messages
    socket.on('message', message => {
      setMessages(message)
    })

    // Setting questions
    socket.on('question', question => {
      setQuestions(questions => [...questions, question])
      setAnswered(false)
    })

    // When you leave the room clear your room
    // it isn't disconnected the user for some reason
    return () => {
      socket.disconnect()
      leaveRoom()
    }
  }, [])

  useEffect(() => {
    socket.emit('updateScore', score)
  }, [score])

  const gameStart = () => {
    socket.emit('gameStart')
  }

  return (
    <section className='trivia'>
      <TriviaHeader username={username} room={room} score={score} />
      <TriviaUsers roomUsers={roomUsers} />
      {/* TODO FADE IN AND OUT THIS SHIT */}
      <TriviaMessages messages={messages} />

      <TrivaTimer time={time} setTime={setTime} />
      <TriviaQuestion
        question={questions.slice(-1)[0]}
        entities={entities}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        setScore={setScore}
        score={score}
        setAnswered={setAnswered}
        answered={answered}
        alert={alert}
        setAlert={setAlert}
      />
      <button
        className='btn'
        onClick={gameStart}
        disabled={questions.length > 0 && !answered}
      >
        {questions.length === 0 ? 'start' : 'next question'}
      </button>
    </section>
  )
}

export default Trivia
