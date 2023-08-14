import React from 'react'
import logo from '../images/logo.svg'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = (props) => {
  const navigate = useNavigate()
  const location = useLocation()

  function signOut() {
    localStorage.removeItem('token')
    navigate('/')
    props.checkToken()
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <div className="header__auth">
        {props.isLoggedIn ? (
          <>
            <p className="header__user">{props.userData.email}</p>
            <Link
              onClick={signOut}
              to="/sign-in"
              className="header__auth-link header__auth-link_signout"
            >
              Выйти
            </Link>
          </>
        ) : (
          <>
            {location.pathname !== '/sign-up' && (
              <Link to="/sign-up" className="header__auth-link">
                Регистрация
              </Link>
            )}
            {location.pathname !== '/sign-in' && (
              <Link to="/sign-in" className="header__auth-link">
                Вход
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default Header
