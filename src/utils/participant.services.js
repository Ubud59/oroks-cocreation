import { retrieveToken } from './auth.services'

function fetchParticipants(testId){
  return fetch(
    `/api/test/${testId}/participants`,
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

const fetchTestAndParticipants = (testId) => {
  return fetch(
    `/api/test2/${testId}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: retrieveToken()
      }
    }
  )
  .then(response => response.json())
  .catch(e => console.warn(e));
}


function postUpdatedParticipant(participant){

  return fetch(
    `/api/participant/${participant.id}/update`,
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

const patchParticipantsToTest = (test, arrayOfSelectedUsers) => {
  return fetch(`/api/test/${test.id}/participants`, {
    method: "PATCH",
    body: JSON.stringify({users: arrayOfSelectedUsers, test: test}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: retrieveToken()
    }
  })
    .then(result => result.json())
}




export {fetchParticipants, fetchTestAndParticipants, postUpdatedParticipant, patchParticipantsToTest};
