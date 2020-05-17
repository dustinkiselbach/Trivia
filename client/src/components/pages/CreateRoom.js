import React, { useState, useContext } from 'react'
import TriviaContext from '../../context/trivia/triviaContext'
import CustomSelect from '../common/CustomSelect'

const CreateRoom = ({ history }) => {
  const [fields, setFields] = useState({
    questions: '',
    difficulty: ''
  })

  const triviaContext = useContext(TriviaContext)
  const { getParams } = triviaContext

  const onSubmit = e => {
    e.preventDefault()
    getParams(fields)
    history.push('/game')
  }

  return (
    <section className='welcome'>
      <div className='welcome__text'>
        <h2 className='welcome__info'>
          Please specify the amount of questions and diffculty
        </h2>
      </div>
      <form>
        <CustomSelect
          name='questions'
          options={[10, 20, 30, 40, 50]}
          label='Number of Questions'
          fields={fields}
          setFields={setFields}
        />
        <CustomSelect
          name='difficulty'
          options={['easy', 'medium', 'hard']}
          label='Difficulty'
          fields={fields}
          setFields={setFields}
        />
        <button
          href='/#'
          className='btn'
          onClick={onSubmit}
          disabled={fields.questions === '' || fields.difficulty === ''}
        >
          Enter Room
        </button>
      </form>
    </section>
  )
}

export default CreateRoom
