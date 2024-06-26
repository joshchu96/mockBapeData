const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///bapeTEST";
} else {
  DB_URI = "postgresql:///bape";
}

let db = new Client({ connectionString: DB_URI });

db.connect();

module.exports = db;
