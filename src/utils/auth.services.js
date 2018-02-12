import jwt_decode from 'jwt-decode'
import queryString from 'query-string';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getRedirectUri = () => {
  return process.env.REACT_APP_AUTH_REDIRECT_URI
}

const getNewAccountUri = () => {
  return process.env.REACT_APP_AUTH_CREATE_ACCOUNT_URI
}


const isAuthenticated = () => {
  if (cookies.get('token') && cookies.get('token') !== undefined) {
    const expire_date = new Date((jwt_decode(cookies.get('token')).exp) * 1000)
    return (expire_date > new Date());
  }
  else {
    return false
  }
}

const retrieveToken = () => {
  if (cookies.get('token') && cookies.get('token') !== undefined) {
    return cookies.get('token');
  }
}

const persistSession = (callbackHashParams) => {
  return new Promise(function(resolve, reject) {
    try {
      const parsedHash = queryString.parse(callbackHashParams);
      cookies.set('token', `Bearer ${parsedHash.access_token}`, { path: '/' });
      resolve(parsedHash);
    }
    catch(error) {
      reject(error);
    }
  });
}

export { isAuthenticated, retrieveToken, getRedirectUri, getNewAccountUri, persistSession }
