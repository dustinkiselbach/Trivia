import React, { useState, useEffect, useContext } from 'react'
import TriviaContext from '../../context/trivia/triviaContext'
import TriviaHeader from './TriviaHeader'
import TriviaUsers from './TriviaUsers'
import TriviaMessages from './TriviaMessages'
import TriviaQuestion from './TriviaQuestion'
const Entities = require('html-entities').AllHtmlEntities

const entities = new Entities()

const Trivia = () => {
  const triviaContext = useContext(TriviaContext)
  const { socket, username, room } = triviaContext

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

  useEffect(() => {
    socket.emit('joinRoom', { username, room })

    // Getting room users
    socket.on('roomUsers', ({ room, users }) => {
      setRoomUsers(users)
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

  const gameStart = () => {
    socket.emit('gameStart')
    setAnswered(false)
  }

  return (
    <section className='trivia'>
      <TriviaHeader username={username} room={room} score={score} />
      <TriviaUsers roomUsers={roomUsers} />
      {/* TODO FADE IN AND OUT THIS SHIT */}
      <TriviaMessages messages={messages} />

      <TriviaQuestion
        question={questions.slice(-1)[0]}
        entities={entities}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        setScore={setScore}
        score={score}
        setAnswered={setAnswered}
        answered={answered}
      />
      <button className='btn' onClick={gameStart}>
        start
      </button>
    </section>
  )
}

export default Trivia
