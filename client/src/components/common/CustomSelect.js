import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

const CustomSelect = ({ options, name, label, fields, setFields }) => {
  const [toggled, setToggled] = useState(false)

  const onClickToggle = () => {
    setToggled(!toggled)
  }

  const onChange = e => {
    const name = e.target.getAttribute('name')

    setFields({ ...fields, [name]: e.target.innerText })
    setToggled(!toggled)
  }

  return (
    <div className='customselect'>
      <label htmlFor='customselect__options' onClick={onClickToggle}>
        {fields[name] === '' ? label : fields[name]}{' '}
        <span
          className={classnames(null, {
            visible: toggled
          })}
        >
          &#9660;
        </span>
      </label>
      <ul
        name={name}
        className={classnames('customselect__options', {
          visible: toggled
        })}
      >
        {options.map(option => (
          <li
            name={name}
            key={option}
            className='customselect__option'
            onClick={onChange}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CustomSelect
