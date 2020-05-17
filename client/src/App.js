import React from 'react'
import './main.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Welcome from './components/pages/Welcome'
import Rooms from './components/pages/Rooms'
import Trivia from './components//trivia/Trivia'
import TriviaState from './context/trivia/TriviaState'
import JoinRoom from './components/pages/JoinRoom'
import CreateRoom from './components/pages/CreateRoom'

function App () {
  return (
    <>
      <TriviaState>
        <Router>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/rooms' exact component={Rooms} />
            <Route path='/create' exact component={CreateRoom} />
            <Route path='/joinroom' exact component={JoinRoom} />
            <Route path='/game' exact component={Trivia} />
          </Switch>
        </Router>
      </TriviaState>
    </>
  )
}

export default App
