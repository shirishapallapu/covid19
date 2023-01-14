const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const dbPath = path.join(__dirname, "covid19India.db");
let db = null;
app.listen(3000);

module.exports = app;

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3 });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/states/", (request, response) => {
  const getStatesListQuery = `SELECT 
    *
    FROM
    state;`;
  const dbResponse = db.all(getStatesListQuery);
  response.send(dbResponse);
});
