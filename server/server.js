const express = require("express");
const port = process.env.PORT || 8080;
const PG = require("pg");
const path = require("path");
const authServices = require("./services/auth.services")
const userServices = require("./services/user.services")
const testServices = require("./services/test.services")
const mailServices = require("./services/mail.services")
const participantServices = require("./services/participant.services")
const fetch = require("node-fetch");
const cors = require("cors")
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const app = express();

app.use(require("body-parser").json());

const { Pool } = require("pg");
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: isPgSslActive()
});

app.use(cors());


// app.use(function (request, result, next) {
//   const excludedPathes = ["/auth/callback" ,"/api/auth", "/api/auth/create", "/"]
//   if (excludedPathes.includes(request.url.split("?")[0])) {
//     next()
//   } else {
//     if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
//       result.status(401).json({message: "Invalid or expired token"});
//     } else {
//       next()
//     };
//   }
// });


/////////////////////////////////////////////////////////////
// Authentification
/////////////////////////////////////////////////////////////

app.get("/api/auth", function (request, result) {
  const authorizeUri = authServices.getAuthorizeUri();

  result.redirect(authorizeUri);
});

app.get("/api/auth/create", function (request, result) {
  const createUserUri = authServices.getNewAccountUri();
  result.redirect(createUserUri);
});

// CALLBACK URL FOR DKT CONNECT TO SEND CODE
app.get("/auth/callback", function (request, result) {
  const tokenRequestParams = authServices.getTokenFromCode(fetch, request.query.code)
    .then(token => {
      return authServices.fetchUser(fetch, token.access_token)
        .then(oauthUser => {
          return userServices.findbyExternalIdOrCreateUser(pool, oauthUser)
          .then(userStatus => {
            if (userStatus === 'createdUser') {
              // redirect mytests
              return {token: token, uri: '/profile'}
            } else {
              // redirect form profile
              return {token: token, uri: '/'}
            }
          })
        })
      //return {token: token, uri: uri}
    })
    .then(redirectInfos => result.redirect(authServices.getFrontRedirectUri(redirectInfos)))
    .catch(error => console.warn(error));
});

app.get("/api/me",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
function(request, result) {
  const access_token = request.headers.authorization.replace(/bearer /gi, "");
  const externalId = authServices.decodeToken(access_token).sub
    userServices.getUserProfileByExternalId(pool, externalId)
    .then(user => result.json(user.rows[0]))
    .catch(e => result.status(500).send(e));
})


/////////////////////////////////////////////////////////////
// Profile
/////////////////////////////////////////////////////////////

app.post(
   "/api/profile/new",
   function (request, result) {
     console.log("body:", request.body);
    return pool.query(
       `UPDATE user_profiles set
         expert_panel = $2,
         height = $3,
         weight = $4,
         practice_type = $5,
         club_city = $6,
         club_name = $7,
         start_of_practice_year = $8,
         shoe_size = $9,
         skate_width = $10,
         shin_gard_size = $11,
         pant_size = $12,
         elbow_pad_size = $13,
         shoulder_pad_size = $14,
         glove_size = $15,
         helmet_size = $16,
         head_size = $17
       WHERE user_id = $1;`,
           [
             request.body.id,
             request.body.expert_panel,
             request.body.height,
             request.body.weight,
             request.body.practice_type,
             request.body.club_city,
             request.body.club_name,
             request.body.start_of_practice_year,
             request.body.shoe_size,
             request.body.skate_width,
             request.body.shin_gard_size,
             request.body.pant_size,
             request.body.elbow_pad_size,
             request.body.shoulder_pad_size,
             request.body.glove_size,
             request.body.helmet_size,
             request.body.head_size
           ]
         )
        .then((dbResult) => {
           console.log("dbResult", dbResult);
           result.json(dbResult);
        })
        .catch(error => {
          console.warn(error);
          result.status(500).send(error);
        });
    }
  );

app.get("/api/users",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
function (request, result) {
  userServices.getAllTestUsers(pool)
    .then(users => result.json(users.rows))
    .catch(e => console.warn(e));
})


/////////////////////////////////////////////////////////////
// Tests
/////////////////////////////////////////////////////////////

app.get("/api/tests/",
    function(request, result) {
      return pool.query(
        `SELECT
    		*
        FROM tests`
      )
      .then((dbResult) => {
        const tests = dbResult.rows;
        result.json(tests);
      });
    }
);





app.get("/api/tests/user/:id",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
    function(request, result) {
      const userId=request.params.id;
      return pool.query(
        `SELECT
    		t.id,
    		t.type,
    		t.test_reference,
    		t.title,
    		t.product,
    		t.status,
    		t.description,
    		t.validation_threshold,
    		t.timing,
    		t.image_src,
    		t.evaluation_form_path,
    		t.evaluation_results_path,
    		p.id AS participant_id,
    		p.test_id,
    		p.user_id,
    		p.invitation_status,
    		p.evaluation_status,
    		p.evaluation_rating
        FROM tests t,
        test_participants p
        WHERE t.id=p.test_id
        AND p.user_id=$1;`,
        [userId]
      )
      .then((dbResult) => {
        const tests = dbResult.rows;
        result.json(tests);
      });
    }
);


/////////////////////////////////////////////////////////////
// Test
/////////////////////////////////////////////////////////////

const storage = multer.diskStorage(
  {
    destination: path.join(__dirname,"images"),
    filename: function (req, file, callback) {
      const extension = file.originalname.split(".").reverse()[0];
      const newFileName = `${file.originalname.split(".")[0]}-${Date.now()}.${extension}`;
      callback(null, newFileName);
    }
  }
);

const upload = multer({
  storage:storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
  fileSize: 10000000
});

app.post(
  "/api/test/upload",
  function(request, result, next) {
    if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
      result.status(401).json({message: "Invalid or expired token"});
    } else {
      next()
    };
  },
  function(request, result) {
    upload.single("file")(request,result, function (error) {
      if (error) {
        console.warn(error);
        result.status(500).send(error);
      } else {
        result.json(request.file.filename);
      }
    })
  }
);

app.get("/api/test/:id",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
  function(request, result) {

    return testServices.selectTest(pool, request)
    .then((test) => {
      result.json(test);
    })
    .catch(error => {
      console.warn(error);
      result.status(500).send(error);
    });
  }
);

app.post(
  "/api/test/:id/update",
  function(request, result, next) {
    if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
      result.status(401).json({message: "Invalid or expired token"});
    } else {
      next()
    };
  },
  function(request, result) {

    return testServices.updateTest(pool, request)
      .then((dbResult) => {
        result.json(dbResult);
      })
      .catch(error => {
        console.warn(error);
        result.status(500).send(error);
      });
  }
);

app.post("/api/test/new",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
  function(request, result) {

    return testServices.insertTest(pool, request)
    .then((dbResult) => {
      console.log(dbResult.rows);
      result.json(dbResult.rows[0].id);
    })
    .catch(error => {
      console.warn(error);
      result.status(500).send(error);
    });
  }
);


/////////////////////////////////////////////////////////////
// Participants
/////////////////////////////////////////////////////////////


app.get("/api/test/:id/participants",
  function(request, result, next) {
    if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
      result.status(401).json({message: "Invalid or expired token"});
    } else {
      next()
    };
  },
  function(request, result) {

    return participantServices.selectParticipants(pool, request)
    .then((participants) => {
      result.json(participants);
    })
    .catch(error => {
      console.warn(error);
      result.status(500).send(error);
    });
  }
);



app.patch("/api/test/:id/participants",
function(request, result, next) {
  if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
    result.status(401).json({message: "Invalid or expired token"});
  } else {
    next()
  };
},
function(request, result) {
  const particpantPromises = request.body.users.map(user => {
    return participantServices.setPartcipantToTest(pool, request.params.id, user.id)
      .then(dbResult => dbResult.rowCount)
  })

  Promise.all(particpantPromises)
  .then(results => {
    const invitationArray = request.body.users.map(user => mailServices.sendInvitationMail(user,request.body.test));
    return results;
  })
  .then(results => result.json({message: "Participants successfully created"}))
})




app.post("/api/participant/:id/update",
  function(request, result, next) {
    if(!request.headers.authorization || !authServices.isValideToken(request.headers.authorization.replace(/bearer /gi, ""))) {
      result.status(401).json({message: "Invalid or expired token"});
    } else {
      next()
    };
  },
  function(request, result) {

    return participantServices.updateParticipant(pool, request)
    .then((dbResult) => {
      result.json(dbResult);
    })
    .catch(error => {
      console.warn(error);
      result.status(500).send(error);
    });
  }
);


/////////////////////////////////////////////////////////////
// Commun
/////////////////////////////////////////////////////////////

app.use("/static", express.static(path.join(__dirname, "../build/static")));

app.use("/images", express.static(path.join(__dirname, "/images")));


app.get("*", (request, result) => {
  result.sendFile(path.join(__dirname, "../build/index.html"));
});

function isPgSslActive() {
  if (process.env.SSLPG === "false") {
    return false;
  }
  return true;
}

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
