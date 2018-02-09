const express = require("express");
const port = process.env.PORT || 8080;
const PG = require("pg");
const path = require("path");
const authServices = require("./services/auth.services")
const userServices = require("./services/user.services")
const fetch = require("node-fetch");
const cors = require("cors")
const multer = require("multer");
const uuidv4 = require("uuid/v4");

const app = express();

app.use(require("body-parser").urlencoded({
 extended: true
}));

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
    .then(token => result.redirect(authServices.getFrontRedirectUri(token)))
    .catch(error => console.warn(error));
});

app.get("/api/me", function(request, result) {
  const token = request.headers.authorization
  authServices.fetchUser(fetch, token)
    .then(user => {
      userServices.findUserbyId(pool, user.id)
      .then(dbRecord => {
        console.log(dbRecord)
        // if (dbRecord.rows.length > 0) {
        //   // redirect mytests
        // } else {
        //   // insert user only
        //   // and
        //   // redirect form profile
        // }
      })
      return user
    })
    .then(user => result.json(user))
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

app.post(
  "/api/test/new",

  function(request, result) {

    const uuid=uuidv4();
    console.log("request.body",request.body);

    return pool.query(
        `INSERT INTO tests (
          id,
          type,
          test_reference,
          title,
          product,
          status,
          description,
          validation_threshold,
          timing,
          image_src,
          evaluation_form_path,
          evaluation_results_path,
          created_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`,
        [
          uuid,
          request.body.type,
          request.body.testReference,
          request.body.title,
          request.body.product,
          request.body.status,
          request.body.description,
          request.body.validationThreshold,
          request.body.timing,
          request.body.imageSrc,
          request.body.evaluationFormPath,
          request.body.evaluationResultsPath,
          request.body.createdBy
        ]
      )
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
