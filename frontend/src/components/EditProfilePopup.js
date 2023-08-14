import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id="popup-edit"
      title="Редактировать профиль"
      name="profile-form"
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label htmlFor="username-input" className="popup__label">
        <input
          value={name || ''}
          onChange={handleChangeName}
          name="username"
          id="username"
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          className="popup__input popup__input_user_name"
        />
        <span className="username-error popup__input-error"></span>
      </label>
      <label htmlFor="user-description-input" className="popup__label">
        <input
          value={description || ''}
          onChange={handleChangeDescription}
          name="description"
          id="user-description"
          type="text"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_user_description"
        />
        <span className="user-description-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
