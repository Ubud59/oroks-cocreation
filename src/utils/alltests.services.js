function fetchAllTests(){
  return fetch(
    `/api/tests/`,
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
