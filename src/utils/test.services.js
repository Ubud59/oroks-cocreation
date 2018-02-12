

function uploadFile(file){

  const formData = new FormData();
  formData.append("file", file);

  return fetch(
    `http://localhost:8080/api/test/upload`,
    {
      method: "POST",
      body:formData
    }
  )
  .then((response) => {
    if (response.status!==200) {
      alert("Une erreur est survenue lors de l'upload!");
    }
    return response.json();
  })
  .then((filename) => {
    return `http://localhost:8080/images/${filename}`;
  })
  .catch((error) => {
    console.warn(error);
    alert(`Erreur : ${error}`);
    return error;
  });
}


function postNewTest(test){
  return fetch(
    `http://localhost:8080/api/test/new`,
    {
      method: "POST",
      body:JSON.stringify(test),
      headers: { "Content-Type": "application/json" }
    }
  )
  .then((response) => {
    if (response.status===200) {
      alert("Test créé avec succès !");
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
    `http://localhost:8080/api/test/${test.id}/update`,
    {
      method: "POST",
      body:JSON.stringify(test),
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


function fetchTest(testId){
  return fetch(
    `http://localhost:8080/api/test/${testId}`,
    {method: "GET"}
  )
  .then((response) => {
    return response.json();
  })
  .then((test) => {
    return test;
  })
  .catch((error) => {
    console.warn(error);
  });
}

export {postNewTest, postUpdatedTest, uploadFile, fetchTest};
