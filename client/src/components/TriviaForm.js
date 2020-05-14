import React, { useContext, useState, useEffect } from 'react'
import TriviaContext from '../context/trivia/triviaContext'

const TriviaForm = props => {
  const triviaContext = useContext(TriviaContext)

  const { categories, getUsername, getRoom, getCategories } = triviaContext

  const [fields, setFields] = useState({
    username: '',
    room: ''
  })

  useEffect(() => {
    getCategories()
  }, [])

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  console.log(fields)

  const onSubmit = e => {
    e.preventDefault()
    getUsername(fields.username)
    getRoom(fields.room)
    props.history.push('/game')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='username'
          type='text'
          placeholder='username'
          onChange={onChange}
        />
        {/* <input name='room' type='text' placeholder='room' onChange={onChange} /> */}
        <select name='room' onChange={onChange} id=''>
          {categories &&
            categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <button>go in</button>
      </form>
    </div>
  )
}

export default TriviaForm
