const requestData = {
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65/',
  baseUrl: 'http://localhost:3000',
  headers: {
    // authorization: '24288f94-4e58-4303-be1b-8968711a8d83',
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'content-Type': 'application/json',
  },
}

export default requestData
