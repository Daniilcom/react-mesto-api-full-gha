import React from 'react'

const PopupWithForm = (props) => {
  return (
    <div id={props.id} className={`popup ${props.isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close"
          title="Закрыть"
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          name={props.name}
          onSubmit={props.onSubmit}
          className="popup__form"
        >
          {props.children}
          <button className="popup__submit" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
