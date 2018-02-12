

function fetchParticipants(testId){
  return fetch(
    `http://localhost:8080/api/test/${testId}/participants`,
    {method: "GET"}
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
    if (response.status===200) {
      alert("Test enregistré avec succès !");
    } else {
      alert("Une erreur est survenue !");
    }
  })
  .catch((error) => {
    console.warn(error);
    alert(`Erreur : ${error}`);
  });
}



export {fetchParticipants, postUpdatedParticipant};
