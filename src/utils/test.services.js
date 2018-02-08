

function postNewTest(test){
  return fetch(
    `http://localhost:8080/api/test/new`,
    {method: "POST"}
  )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
        console.warn(error);
  });
}

export {postNewTest};
