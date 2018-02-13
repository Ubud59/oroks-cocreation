import HttpErrorHandler from './utils.services';

function fetchMyTests(userId){
  return fetch(
    `http://localhost:8080/api/tests/user/${userId}`,
    {method: "GET"}
  )
  .then(response => HttpErrorHandler(response))
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
        console.warn(error);
  });
}

export {fetchMyTests};
