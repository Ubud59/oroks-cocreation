import jwt_decode from 'jwt-decode'
import queryString from 'query-string';


const getRedirectUri = () => {
  return process.env.REACT_APP_AUTH_REDIRECT_URI
}

const isAuthenticated = () => {
  if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined) {
    const expire_date = new Date((jwt_decode(localStorage.getItem('token')).exp) * 1000)
    return (expire_date > new Date());
  }
  else {
    return false
  }
}

const retrieveToken = () => {
  if (localStorage.getItem('token') && localStorage.getItem('token') !== undefined) {
    return localStorage.getItem('token')
  }
}

const persistSession = (callbackHashParams) => {
  return new Promise(function(resolve, reject) {
    try {
      const parsedHash = queryString.parse(callbackHashParams);
      localStorage.setItem('token', `Bearer ${parsedHash.access_token}`);
      resolve(parsedHash);
    }
    catch(error) {
      reject(error);
    }
  });
}

export { isAuthenticated, retrieveToken, getRedirectUri, persistSession }
