const express = require("express");
const port = process.env.PORT || 4000;
const PG = require("pg");


const app = express();

app.get("/",
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

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
