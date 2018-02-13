import { retrieveToken } from './auth.services'

function fetchParticipants(testId){
  return fetch(
    `http://localhost:8080/api/test/${testId}/participants`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: retrieveToken()
      }
    }
  )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.warn(error);
  });
}




function postUpdatedParticipant(participant){

  return fetch(
    `http://localhost:8080/api/participant/${participant.id}/update`,
    {
      method: "POST",
      body:JSON.stringify(participant),
      headers: { "Content-Type": "application/json" }
    }
  )
  .then((response) => {
    if (response.status!==200) {
      alert("Une erreur est survenue !");
    }
  })
  .catch((error) => {
    console.warn(error);
    alert(`Erreur : ${error}`);
  });
}

const patchParticipantsToTest = (testId, arrayOfSelectedUsers) => {
  return fetch(`http://localhost:8080/api/test/${testId}/participants`, {
    method: "PATCH",
    body: JSON.stringify({users: arrayOfSelectedUsers}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: retrieveToken()
    }
  })
}


export {fetchParticipants, postUpdatedParticipant, patchParticipantsToTest};
