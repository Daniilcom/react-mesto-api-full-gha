import requestDataAuth from './requestDataAuth'

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
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

  register({ email, password }) {
    return this._request(`${this._baseUrl}/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  authorize({ email, password }) {
    return this._request(`${this._baseUrl}/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  getContent(token) {
    if (token !== undefined) {
      return this._request(`${this._baseUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
    }
  }
}

const auth = new Auth(requestDataAuth)

export default auth
