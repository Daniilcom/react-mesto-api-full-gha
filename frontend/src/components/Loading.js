import React from 'react'
import loading from '../images/icons/loading_icon.svg'

const Loading = (props) => {
  return (
    <div
      className={`popup ${
        props.isLoggedIn === null ? 'popup_open-loading' : ''
      }`}
    >
      <div className="popup__container">
        <img src={loading} className="popup__img-info" />
        <h3 className="popup__subtitle-info">Загрузка...</h3>
      </div>
    </div>
  )
}

export default Loading
