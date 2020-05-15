import React, { useState, useContext, useEffect } from 'react'
import TriviaContext from '../../context/trivia/triviaContext'

const Welcome = ({ history }) => {
  const triviaContext = useContext(TriviaContext)
  const { getUsername } = triviaContext
  const [field, setField] = useState('')

  useEffect(() => {
    // Checking if username is in localstorage
    if (localStorage.getItem('username') !== null) {
      history.push('/rooms')
    }
  }, [])

  const onChange = e => {
    setField(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (field.length > 0) {
      getUsername(field)
      history.push('/rooms')
    }
  }

  return (
    <section className='welcome'>
      <div className='welcome__text'>
        <h1 className='title'>Welcome to Trivia Bunny</h1>
        <h2 className='welcome__info'>Please Choose a name...</h2>
      </div>
      <form>
        <div className='welcome__form'>
          <input
            name='username'
            type='text'
            onChange={onChange}
            required
            autoComplete='off'
          />
          <label htmlFor='name' className='label-name'>
            <span className='content-name'>Name</span>
          </label>
        </div>
        <button href='/#' className='btn' onClick={onSubmit}>
          Submit
        </button>
      </form>
    </section>
  )
}

export default Welcome
