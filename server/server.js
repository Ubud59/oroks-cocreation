const express = require("express");
const port = process.env.PORT || 8080;
const PG = require("pg");
const path = require("path");
const authServices = require("./services/auth.services")
const fetch = require("node-fetch");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/tests",
    function(request, result) {
      const client = new PG.Client();
      client.connect();
      return client.query(
        "SELECT * FROM tests;"
      )
      .then((dbResult) => {
        const tests = dbResult.rows;
        client.end();
        result.json({
          tests : tests
        });
      });
    }
);

app.get("/api/auth", function (request, result) {
  const authorizeUri = authServices.getAuthorizeUri();

  result.redirect(authorizeUri);
});

// CALLBACK URL FOR DKT CONNECT TO SEND CODE
app.get("/auth/callback", function (request, result) {
  const tokenRequestParams = authServices.getTokenFromCode(request.query.code);

  fetch(tokenRequestParams.uri, {
    method: "POST",
    body:    tokenRequestParams.params,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(res => res.json())
    .then(token => result.redirect(authServices.getFrontRedirectUri(token)))
    .catch(error => console.warn(error));
});

app.get("/api/me", function(request, result) {
  const token = request.headers.authorization
  authServices.fetchUser(fetch, token)
    .then(user => result.json(user))
    .catch(e => result.status(500).send(e));
})

app.use("/static", express.static(path.join(__dirname, "../build/static")));

app.get("*", (request, result) => {
  result.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
