import React from 'react'
import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = (props) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name,
      link,
    })
  }

  useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id="popup-add"
      title="Новое место"
      name="place-form"
      buttonText={props.isLoading ? 'Создание...' : 'Создать'}
    >
      <label htmlFor="place-input" className="popup__label">
        <input
          value={name || ''}
          onChange={handleChangeName}
          name="place"
          id="place"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          className="popup__input popup__input_place_name"
        />
        <span className="place-error popup__input-error"></span>
      </label>
      <label htmlFor="link-input" className="popup__label">
        <input
          value={link}
          onChange={handleChangeLink}
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          className="popup__input popup__input_place_link"
        />
        <span className="link-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup
