function fetchAllTests(){
  return fetch(
    `http://localhost:8080/api/tests/`,
    {method: "GET"}
  )
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
        console.warn(error);
  });
}

export {fetchAllTests};
