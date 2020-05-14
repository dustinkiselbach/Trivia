import React, { useReducer } from 'react'
import TriviaContext from './triviaContext'
import triviaReducer from './triviaReducer'
import socketIOClient from 'socket.io-client'

import { GET_USERNAME, GET_ROOM } from '../types'

const TriviaState = props => {
  const initialState = {
    //https://cryptic-stream-18621.herokuapp.com/
    //'http://127.0.0.1:5000'
    socket: socketIOClient('https://cryptic-stream-18621.herokuapp.com/'),
    room: null,
    username: null
  }

  const [state, dispatch] = useReducer(triviaReducer, initialState)

  // Get users username
  const getUsername = username => {
    dispatch({ type: GET_USERNAME, payload: username })
  }

  // get users room
  const getRoom = room => {
    dispatch({ type: GET_ROOM, payload: room })
  }

  return (
    <TriviaContext.Provider
      value={{
        socket: state.socket,
        username: state.username,
        room: state.room,
        getUsername,
        getRoom
      }}
    >
      {props.children}
    </TriviaContext.Provider>
  )
}

export default TriviaState
