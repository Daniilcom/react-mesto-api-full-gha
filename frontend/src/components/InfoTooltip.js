import React from 'react'
import fail from '../images/icons/fail_icon.svg'
import success from '../images/icons/success_icon.svg'

const InfoTooltip = (props) => {
  return (
    <div id={props.id} className={`popup ${props.isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
          title="Закрыть"
        ></button>
        <img
          src={props.statusAuth ? success : fail}
          className="popup__img-info"
        />
        <h3 className="popup__subtitle-info">{props.textInfo}</h3>
      </div>
    </div>
  )
}

export default InfoTooltip
