import React from 'react'

const ImagePopup = (props) => {
  return (
    <div className={`popup popup_open-img ${props.isOpen ? 'popup_open' : ''}`}>
      <article className="popup__img-place">
        <button
          type="button"
          className="popup__close"
          title="Закрыть"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          className="popup__image"
          alt={props.card.name}
        />
        <p className="popup__name">{props.card.name}</p>
      </article>
    </div>
  )
}

export default ImagePopup
