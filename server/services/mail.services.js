const translateLabel = require("./translateLabel");
const nodemailer = require("nodemailer");

const generateMailOptions = (userProfile, test) =>  {
  return mailOptions = {
      from: "Oroks <oroks.tests@gmail.com>",
      to: userProfile.email,
      subject: `Oroks - invitation au test ${test.title}`,
      html: `
      <img style="width:100%;height:auto;" src="https://oroks-cocreation-staging.herokuapp.com/media/Background.JPG" alt="">
      <div style="margin-left: 20%; margin-right: 20%;">
        <center>
          <FONT face="Verdana">
          <h1> Salut à toi testeur de la communauté Oroks ! </h1>
          <p >
            <strong>${userProfile.first_name}</strong>, Dans le cadre du développement de notre produit : <strong>${test.product}</strong>, nous sommes à la recherche de testeurs et nous avons pensé à toi !
            Alors si tu as envie de participer à ce test, n’attend plus et valide ton invitation !
          </p>
          <div style="padding-left: 25%; padding-right: 25%; justify-content: center;">
            <div style="border: 1px solid black; background-color: #F0F0F0; margin-top: 5%; padding-bottom: 10%;">
              <img style="width:100%;height:auto;" src="${test.image_src}" alt="">
              <h1>${test.title}</h1>
              <p> Viens tester notre produit : <strong>${test.product}</strong> pour nous aider à l'améliorer. </p>
              <div style="padding-left: 5%; padding-bottom: 5%;">
                <h4 style="text-align: left;"> Type de test :</h4>
                <p style="text-align: left;"> ${translateLabel.translateLabel(test.type)} </p>
                <h4 style="text-align: left;"> Description du test </h4>
                <p style="text-align: left;"> ${test.description}</p>
                <h4 style="text-align: left;"> Dates du test </h4>
                <p style="text-align: left;"> ${test.timing} </p>
              </div>
              <div style="height: 40px; width: 60%; background-color: #3382C5; vertical-align: middle; line-height:2em;" >
                <a style="text-decoration: none" href="https://oroks-cocreation-staging.herokuapp.com/mytests/${userProfile.id}/">
                  <div style="color: white;">JE VALIDE MON INVITATION !</div>
                </a>
              </div>
            </div>
          </div>
          </FONT>
        </center>
      </div>`
    };
}


const sendInvitationMail = (userProfile, test) =>  {

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "oroks.tests@gmail.com",
        pass: "oroksforever"
      }
    });

    let mailOptions = generateMailOptions(userProfile,test);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.warn("Error: " + error);
        return error;
      }
      else {
        console.log("Message sent: " + info.messageId);
        return info;
      }
    });
}

module.exports = {
  sendInvitationMail: sendInvitationMail
}
