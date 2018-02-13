

function sendInvitationMail(userProfile,test){
  return fetch(
    `http://localhost:8080/api/send-mail`,
    {
      method: "POST",
      body:{
        userProfile: JSON.stringify(userProfile),
        test: JSON.stringify(test)
      }
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



export {sendInvitationMail};
