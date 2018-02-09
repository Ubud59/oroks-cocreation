const express = require("express");
const port = process.env.PORT || 8080;
const PG = require("pg");
const path = require("path");
const authServices = require("./services/auth.services")
const userServices = require("./services/user.services")
const testServices = require("./services/test.services")
const participantServices = require("./services/participant.services")
const fetch = require("node-fetch");
const cors = require("cors")
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const jwtDecode = require('jwt-decode');

const app = express();

app.use(require("body-parser").json());

const { Pool } = require("pg");
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: isPgSslActive()
});

app.use(cors());


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
              return {token: token, uri: '/myprofile'}
            } else {
              // redirect form profile
              return {token: token, uri: '/mytests'}
            }
          })
        })
      //return {token: token, uri: uri}
    })
    .then(redirectInfos => result.redirect(authServices.getFrontRedirectUri(redirectInfos)))
    .catch(error => console.warn(error));
});

app.get("/api/me", function(request, result) {
  const access_token = request.headers.authorization
  const externalId = decodeToken(access_token).sub
    userServices.getUserProfileByExternalId(pool, externalId)
    .then(user => result.json(user.rows[0]))
    .catch(e => result.status(500).send(e));
})


/////////////////////////////////////////////////////////////
// Profile
/////////////////////////////////////////////////////////////

app.post("/api/profile/new", function (request, result) {
  createMyProfile(pool,request.params);
});


/////////////////////////////////////////////////////////////
// Tests
/////////////////////////////////////////////////////////////

app.get("/api/tests/user/:id",
    function(request, result) {
      const userId=request.params.id;

      return pool.query(
        `SELECT t.*
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

app.post("/api/test/new",
  function(request, result) {

    return testServices.insertTest(pool, request)
    .then((dbResult) => {
      result.json(dbResult);
    })
    .catch(error => {
      console.warn(error);
      result.status(500).send(error);
    });
  }
);

app.get("/api/test/:id",
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



/////////////////////////////////////////////////////////////
// Participants
/////////////////////////////////////////////////////////////


app.get("/api/test/:id/participants",
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

app.post("/api/participant/:id/update",
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

const decodeToken = (access_token) => {
  const decodedToken = jwtDecode(access_token)
  return {
    country: decodedToken.country,
    sub: decodedToken.sub,
    iss: decodedToken.iss,
    last_name: decodedToken.last_name,
    exp: decodedToken.exp,
    first_name: decodedToken.first_name,
    iat: decodedToken.iat,
    client_id: decodedToken.client_id
  }
}

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
