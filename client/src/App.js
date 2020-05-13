import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TriviaForm from './components/TriviaForm'
import Trivia from './components/Trivia'
import TriviaState from './context/trivia/TriviaState'

function App () {
  return (
    <>
      <TriviaState>
        <Router>
          <Switch>
            <Route path='/' exact component={TriviaForm} />
            <Route path='/game' exact component={Trivia} />
          </Switch>
        </Router>
      </TriviaState>
    </>
  )
}

export default App
