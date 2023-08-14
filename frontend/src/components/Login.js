import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from '../utils/auth'

const Login = (props) => {
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
      .authorize(formValue)
      .then((data) => {
        localStorage.setItem('token', data.token)
        props.isLoggedIn(true)
        props.checkToken()
        navigate('/')
      })
      .catch(() => {
        props.statusAuth(false)
        props.onStatusAuth()
        props.textInfo('Что-то пошло не так! Попробуйте ещё раз.')
      })
  }

  return (
    <>
      <div className="auth">
        <p className="auth__title">Вход</p>
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
          <button type="submit" className="auth__submit">
            Войти
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
