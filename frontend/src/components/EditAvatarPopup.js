import React from 'react'
import { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = (props) => {
  const avatarRef = useRef('')

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [avatarRef.current.value])

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      id="popup-avatar"
      title="Обновить аватар"
      name="avatar-form"
      buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <label htmlFor="avatar-input" className="popup__label">
        <input
          ref={avatarRef}
          name="avatar"
          id="avatar"
          type="url"
          placeholder="Ссылка на аватар"
          required
          className="popup__input popup__input_avatar_link"
        />
        <span className="avatar-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
