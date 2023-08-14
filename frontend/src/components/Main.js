import React from 'react'
import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'

const Main = (props) => {
  const currentUser = useContext(CurrentUserContext)
  
  return (
    <>
      <main>
        <section className="profile">
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt="Аватар"
          />
          <button
            onClick={props.onEditAvatar}
            type="button"
            className="profile__avatar-upd"
            title="Обновить аватар профиля"
          ></button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              className="profile__edit"
              title="Редактировать профиль"
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onAddPlace}
            type="button"
            className="profile__add"
            title="Добавить место"
          ></button>
        </section>
        <section className="gallary">
          <ul className="gallary__items list">
            {props.cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  link={card.link}
                  name={card.name}
                  likesCount={card.likes.length}
                  card={card}
                  onCardClick={props.onCardClick}
                  onCardLike={props.onCardLike}
                  onConfirm={props.onConfirm}
                />
              )
            })}
          </ul>
        </section>
      </main>
    </>
  )
}

export default Main
