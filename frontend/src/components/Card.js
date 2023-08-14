import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useContext } from 'react'

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = props.card.owner === currentUser._id
  const isLiked = props.card.likes.some(id => id === currentUser._id)
  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onConfirm(props.card)
  }

  const cardLikeButtonClassName = `gallary__like ${
    isLiked && 'gallary__like_active'
  }`

  return (
    <li className="gallary__item">
      {isOwn && (
        <button
          type="button"
          className="gallary__trash"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={props.link}
        className="gallary__image"
        onClick={handleClick}
        alt={props.name}
      />
      <div className="gallary__info">
        <h2 className="gallary__description">{props.name}</h2>
        <div className="gallary__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="gallary__like-counter">{props.likesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default Card
