import HttpErrorHandler from './utils.services';
import { retrieveToken } from './auth.services'

function fetchMyTests(userId){
  return fetch(
    `http://localhost:8080/api/tests/user/${userId}`,
    {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: retrieveToken()
      }
    }
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
