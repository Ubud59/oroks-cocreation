import HttpErrorHandler from './utils.services'

const fetchUser = (access_token) => {

  const url = process.env.REACT_APP_USER_INFOS_URI

  const options = {
    method: 'GET',
    headers: {
      'Authorization': access_token,
      'Content-Type': 'application/json'
    },
  }

  return fetch(url, options)
    .then(result => HttpErrorHandler(result))
    .then(result => result.json())
    .catch(error => error);
}

export default fetchUser
