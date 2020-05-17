import React from 'react'
import { useTransition, animated } from 'react-spring'

const TriviaMessages = ({ messages }) => {
  const transitions = useTransition(messages.text, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })
  return transitions.map(({ item, key, props }) => (
    <animated.div key={item} className='trivia__messages' style={props}>
      <h2>{item}</h2>
    </animated.div>
  ))
}

export default TriviaMessages
