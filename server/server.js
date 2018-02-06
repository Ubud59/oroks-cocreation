const express = require("express");
const port = process.env.PORT || 4000;
const PG = require("pg");
const path = require("path");

const app = express();

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


app.use("/static", express.static(path.join(__dirname, "../build/static")));

app.get("*", (request, result) => {
  result.sendFile(path.join(__dirname, "../build/index.html"));
});


app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
