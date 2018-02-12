import HttpErrorHandler from './utils.services'
import { retrieveToken } from './auth.services'

const loadTokenAndFetchUser = () => {
  const access_token = retrieveToken()
  if (access_token) {
    const userInfos = fetchUser(access_token)
      .then(result => result)
      .catch(e => console.warn(e));
    return userInfos
  } else {
    return new Promise(function(resolve, reject) {
      reject("no valid token")
    });
  }
}

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
export {loadTokenAndFetchUser, fetchUser}
