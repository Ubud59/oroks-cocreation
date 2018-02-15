import { retrieveToken } from './auth.services'

function postNewProfile(profile){
  // const access_token = retrieveToken();
  console.log("profile dans post:",profile);
  return fetch(
    `/api/profile/new`,
    {
      method: "POST",
      body:JSON.stringify(profile),
      headers: {
        Authorization: retrieveToken(),
        'Content-Type': 'application/json'
      },
    }
  )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
        console.warn(error);
  });
}

function fetchMyProfile(userId){
  return fetch(
    `/api/profile/user/${userId}`,
    {method: "GET"}
  )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
        console.warn(error);
  });
}

export {fetchMyProfile, postNewProfile};
