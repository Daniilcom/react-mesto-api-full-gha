import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import auth from '../utils/auth'
import ProtectedRoute from './ProtectedRoute'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ImagePopup from './ImagePopup'
import ConfirmPopup from './ConfirmPopup'
import InfoTooltip from './InfoTooltip'
import Login from './Login'
import Register from './Register'
import Loading from './Loading'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [isImageOpen, setIsImageOpen] = useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [statusAuth, setStatusAuth] = useState(null)
  const [userData, setUserData] = useState({})
  const [textInfo, setTextInfo] = useState(null)
  const navigate = useNavigate()

  function checkToken() {
    const token = localStorage.getItem('token')
    if (token) {
      auth
        .getContent(token)
        .then((data) => {
          if (data) {
            setUserData(data)
            setIsLoggedIn(true)
            navigate('/')
          }
        })
        .catch(() => {
          setIsLoggedIn(false)
          setUserData({})
        })
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  useEffect(() => {
    isLoggedIn &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, initialCards]) => {
          setCurrentUser(data)
          setCards(initialCards)
        })
        .catch((err) => {
          alert(err)
        })
  }, [isLoggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleTrashClick(card) {
    setIsConfirmPopupOpen(true)
    setSelectedCard({
      _id: card._id,
    })
  }

  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard({
      name: card.name,
      link: card.link,
    })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageOpen(false)
    setIsConfirmPopupOpen(false)
    setInfoTooltipOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => {
        alert(err)
      })
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id))
        closeAllPopups()
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api
      .sendUserInfo(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api
      .updAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addCard(data)
      .then((data) => {
        setCards([data, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        alert(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleIsInfoTooltipPopup() {
    if (statusAuth) {
      setInfoTooltipOpen(true)
    }
    setInfoTooltipOpen(true)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          userData={userData}
          isLoggedIn={isLoggedIn}
          checkToken={checkToken}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onConfirm={handleTrashClick}
                    checkToken={checkToken}
                  />
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                statusAuth={setStatusAuth}
                isLoggedIn={setIsLoggedIn}
                onStatusAuth={handleIsInfoTooltipPopup}
                checkToken={checkToken}
                textInfo={setTextInfo}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                statusAuth={setStatusAuth}
                isLoggedIn={setIsLoggedIn}
                onStatusAuth={handleIsInfoTooltipPopup}
                checkToken={checkToken}
                textInfo={setTextInfo}
              />
            }
          />
        </Routes>
        <Footer isLoggedIn={isLoggedIn} />
        <ImagePopup
          isOpen={isImageOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          statusAuth={statusAuth}
          textInfo={textInfo}
        />
        <Loading isLoggedIn={isLoggedIn} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
