import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../utils/auth'

const Register = (props) => {
  const navigate = useNavigate()
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    auth
      .register(formValue)
      .then(() => {
        props.isLoggedIn(true)
        props.statusAuth(true)
        props.onStatusAuth()
        props.textInfo('Вы успешно зарегистрировались!')
        props.checkToken()
        navigate('/sign-in')
      })
      .catch(() => {
        props.isLoggedIn(false)
        props.statusAuth(false)
        props.onStatusAuth()
        props.textInfo('Что-то пошло не так! Попробуйте ещё раз.')
      })
  }

  return (
    <div>
      <div className="auth">
        <p className="auth__title">Регистрация</p>
        <form className="auth__form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="auth__label">
            <input
              className="auth__input"
              value={formValue.email || ''}
              onChange={handleChange}
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
          <label htmlFor="password" className="auth__label">
            <input
              className="auth__input"
              value={formValue.password || ''}
              onChange={handleChange}
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              required
            />
          </label>
          <button type="submit" className="auth__submit_signin">
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="auth__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">
          &nbsp;Войти
        </Link>
      </div>
    </div>
  )
}

export default Register
