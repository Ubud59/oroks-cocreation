const express = require("express");
const port = process.env.PORT || 8080;
const PG = require("pg");
const path = require("path");
const authServices = require("./services/auth.services")
const userServices = require("./services/user.services")
const fetch = require("node-fetch");
const cors = require("cors")
const app = express();

const { Pool } = require("pg");
const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: isPgSslActive()
});

app.use(cors());

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
      .then(dbRecord => console.log(dbRecord))
      return user
    })
    .then(user => result.json(user))
    .catch(e => result.status(500).send(e));
})

app.use("/static", express.static(path.join(__dirname, "../build/static")));

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
