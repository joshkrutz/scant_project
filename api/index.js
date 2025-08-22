const express = require("express");

const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.get("/", (req, res) => {
  knex
    .select()
    .from("test")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
