import React, { useState, useContext } from 'react'
import TriviaContext from '../../context/trivia/triviaContext'

const JoinRoom = ({ history }) => {
  const [field, setField] = useState('')
  const triviaContext = useContext(TriviaContext)
  const { getRoom } = triviaContext

  const onChange = e => {
    setField(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    getRoom(field)
    history.push('/game')
  }
  return (
    <section className='welcome'>
      <div className='welcome__text'>
        <h2 className='welcome__info'>Please enter the 4 digit room code</h2>
      </div>
      <form>
        <div className='welcome__form'>
          <input
            name='room'
            type='text'
            onChange={onChange}
            required
            autoComplete='off'
          />
          <label htmlFor='room' className='label-name'>
            <span className='content-name'>Room</span>
          </label>
        </div>
        <button href='/#' className='btn' onClick={onSubmit}>
          Submit
        </button>
      </form>
    </section>
  )
}

export default JoinRoom
