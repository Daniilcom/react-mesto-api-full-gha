import requestData from './requestData'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }
  
  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: 'DELETE',
    })
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  }

  sendUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.about}`,
      }),
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        method: 'PUT',
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
        method: 'DELETE',
      })
    }
  }

  updAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
  }
}

const api = new Api(requestData)

export default api
