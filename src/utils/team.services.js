
function fetchTeam(testId){
  return fetch(
    `http://localhost:8080/api/test/${testId}/team`,
    {method: "GET"}
  )
  .then((response) => {
    return response.json();
  })
  .then((team) => {
    return team;
  })
  .catch((error) => {
    console.warn(error);
  });
}

export {fetchTeam};
