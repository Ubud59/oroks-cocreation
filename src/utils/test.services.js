import { retrieveToken } from './auth.services'

function uploadFile(file){

  const formData = new FormData();
  formData.append("file", file);

  return fetch(
    `/api/test/upload`,
    {
      method: "POST",
      body:formData,
      headers: {
        'Authorization': retrieveToken(),
      }
    }
  )
  .then((response) => {
    if (response.status!==200) {
      alert("Une erreur est survenue lors de l'upload!");
    }
    return response.json();
  })
  .then((fileUrl) => {
    return `${fileUrl}`;
  })
  .catch((error) => {
    console.warn(error);
    alert(`Erreur : ${error}`);
    return error;
  });
}


function postNewTest(test){
  return fetch(
    `/api/test/new`,
    {
      method: "POST",
      body:JSON.stringify(test),
      headers: {
        'Authorization': retrieveToken(),
        "Content-Type": "application/json"
      }
    }
  )
  .then((response) => {
    if (response.status===200) {
      return response.json();
    } else {
      alert("Une erreur est survenue !");
    }
  })
  .catch((error) => {
    console.warn(error);
    alert(`Erreur : ${error}`);
  });
}


function postUpdatedTest(test){

  return fetch(
    `/api/test/${test.id}/update`,
    {
      method: "POST",
      body:JSON.stringify(test),
      headers: {
        'Authorization': retrieveToken(),
        "Content-Type": "application/json"
      }
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


function fetchTest(testId){
  return fetch(
    `/api/test/${testId}`,
    {
      method: "GET",
      headers: {
        'Authorization': retrieveToken(),
        "Content-Type": "application/json"
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

export {postNewTest, postUpdatedTest, uploadFile, fetchTest};
