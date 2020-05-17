import React, { useReducer, useEffect } from 'react'
import TriviaContext from './triviaContext'
import triviaReducer from './triviaReducer'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

import { GET_USERNAME, GET_ROOM, GET_CATEGORIES, GET_PARAMS } from '../types'

const TriviaState = props => {
  const initialState = {
    //https://cryptic-stream-18621.herokuapp.com/
    //'http://127.0.0.1:5000'
    socket: socketIOClient('https://cryptic-stream-18621.herokuapp.com/'),
    room: null,
    username: null,
    categories: null,
    numberOfQuestions: null,
    difficulty: null
  }

  useEffect(() => {
    // Checking if username is in localstorage
    if (localStorage.getItem('username') !== null) {
      getUsername(localStorage.getItem('username'))
    }
    // Checking if room is in localstorage
    if (localStorage.getItem('room') !== null) {
      getRoom(localStorage.getItem('room'))
    }
  }, [])

  const [state, dispatch] = useReducer(triviaReducer, initialState)

  // Get users username
  const getUsername = username => {
    localStorage.setItem('username', username)
    dispatch({ type: GET_USERNAME, payload: username })
  }

  // get users room
  const getRoom = room => {
    localStorage.setItem('room', room)
    dispatch({ type: GET_ROOM, payload: room })
  }

  // leave users room
  const leaveRoom = () => {
    localStorage.removeItem('room')
    dispatch({ type: GET_ROOM, payload: null })
  }

  // get Trivia Paramaters
  const getParams = params => {
    dispatch({ type: GET_PARAMS, payload: params })
  }

  // get all categories
  const getCategories = async () => {
    try {
      const res = await axios.get('https://opentdb.com/api_category.php')

      dispatch({ type: GET_CATEGORIES, payload: res.data.trivia_categories })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TriviaContext.Provider
      value={{
        socket: state.socket,
        username: state.username,
        room: state.room,
        categories: state.categories,
        numberOfQuestions: state.numberOfQuestions,
        difficulty: state.difficulty,
        getUsername,
        getRoom,
        leaveRoom,
        getCategories,
        getParams
      }}
    >
      {props.children}
    </TriviaContext.Provider>
  )
}

export default TriviaState
