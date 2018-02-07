const { URLSearchParams } = require("url");

const frontUri = process.env.FRONT_REDIRECT_URI;
const dktConnectRootUri=process.env.DKTCONNECT_ROOT_URI;
const clientId = process.env.CLIENT_ID;
const redirect_uri = process.env.CALLBACK_URI;
const secret = process.env.SECRET;
const state = "oroks-state"

const getAuthorizeUri = () => {
  return `${dktConnectRootUri}/oauth/authorize?response_type=code&client_id=${clientId}&scope=openid&locale=fr_FR&redirect_uri=${redirect_uri}&state=${state}`;
};

const getTokenFromCode = (code) => {

  const params = new URLSearchParams();
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("state", state);
  params.append("grant_type", "authorization_code");

  const tokenRequestParams = {
    uri: `${dktConnectRootUri}/oauth/token?client_id=${clientId}&state=${state}&client_secret=${secret}`,
    params: params
  }

  return tokenRequestParams;
};

const getFrontRedirectUri = (token) => {
  return `${frontUri}#access_token=${token.access_token}&token_type=${token.token_type}&expires_in=${token.expires_in}`
};

const fetchUser = (fetch, access_token) => {
  const url = `${dktConnectRootUri}/account?client_id=${clientId}&state=${state}&locale=fr_FR`
  console.log(url)
  console.log(access_token)
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
  }

  return fetch(url, options)
    .then(result => result.json())
    .then(json => {
      const userInfos = {
        id: json.id_person,
        firstname: json.name,
        lastname: json.surname,
        birthdate: json.birthdate,
        email: '',
        phone: ''
      }
      return userInfos
    })
    .catch(error => console.warn(error))
}

module.exports = {
  getAuthorizeUri: getAuthorizeUri,
  getTokenFromCode: getTokenFromCode,
  getFrontRedirectUri: getFrontRedirectUri,
  fetchUser: fetchUser
};
