import React from 'react'
import PopupWithForm from './PopupWithForm'

const ConfirmPopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault()
    props.onCardDelete(props.card)
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id="confirm-add"
      title="Вы уверены?"
      name="confirm-form"
      buttonText={props.isLoading ? 'Удаление...' : 'Удалить'}
    />
  )
}

export default ConfirmPopup
