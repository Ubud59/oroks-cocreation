

function postNewTest(test){

  const formData = new FormData();
  formData.append("type", test.type);
  formData.append("testReference", test.testReference);
  formData.append("title", test.title);
  formData.append("product", test.product);
  formData.append("status", test.status);
  formData.append("description", test.description);
  formData.append("validationThreshold", test.validationThreshold);
  formData.append("timing", test.timing);
  formData.append("imageSrc", test.imageSrc);
  formData.append("evaluationFormPath", test.evaluationFormPath);
  formData.append("evaluationResultsPath", test.evaluationResultsPath);
  formData.append("createdBy", test.createdBy);


  return fetch(
    `http://localhost:8080/api/test/new`,
    {
      method: "POST",
      body:formData
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

export {postNewTest};
