import React, { useEffect } from 'react'
import classnames from 'classnames'

const TriviaQuestion = ({
  question,
  setUserAnswer,
  userAnswer,
  score,
  setScore,
  setAnswered,
  alert,
  setAlert,
  answered,
  entities
}) => {
  const clickAnswer = e => {
    setUserAnswer(e.target.innerText)
    setAnswered(true)
  }

  useEffect(() => {
    if (question) {
      if (question.correct_answer === userAnswer) {
        setScore(score + 1)
        setAlert('correct')
      } else {
        setAlert('incorrect')
      }
    }
  }, [userAnswer])

  let newQuestion
  if (answered) {
    newQuestion = (
      <>
        <div className='trivia__question-answered'>
          <span
            className={classnames(null, {
              wrong: alert === 'incorrect',
              correct: alert === 'correct'
            })}
          >
            {alert}
          </span>
          , the correct answer was {question.correct_answer}
        </div>
      </>
    )
  } else if (question) {
    if (question.type === 'multiple') {
      let allAnswers = question.incorrect_answers
      // Some bullshit to make sure it doesn't keep adding the correct answer
      // TODO make this work cleaner
      if (allAnswers.length < 4) {
        allAnswers.push(question.correct_answer)
      }
      allAnswers.sort()

      newQuestion = (
        <>
          <h2 className='trivia__question-question'>
            {entities.decode(question.question)}
          </h2>
          <ul className='trivia__question-multiple'>
            {allAnswers.map(answer => (
              <li onClick={clickAnswer} key={answer}>
                {answer}
              </li>
            ))}
          </ul>
        </>
      )
    } else {
      let allAnswers = ['True', 'False']
      newQuestion = (
        <>
          <h2 className='trivia__question-question'>
            {entities.decode(question.question)}
          </h2>
          <ul className='trivia__question-boolean'>
            {allAnswers.map(answer => (
              <li onClick={clickAnswer} key={answer}>
                {answer}
              </li>
            ))}
          </ul>
        </>
      )
    }
  }

  return <div className='trivia__question'>{newQuestion}</div>
}

export default TriviaQuestion
