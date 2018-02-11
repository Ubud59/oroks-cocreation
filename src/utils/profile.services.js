function postNewProfile(profile){
  return fetch(
    `http://localhost:8080/api/profile/new`,
    {method: "POST"}
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
    `http://localhost:8080/api/profile/user/${userId}`,
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
