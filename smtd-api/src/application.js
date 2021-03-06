//for resetting DEV database
const fs = require("fs");
const path = require("path");

//Server setup
const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");

//create server and access database
const app = express();
const db = require("./db");

//setup routes
const tasks = require("./routes/tasks");
const users = require("./routes/users");
const login = require("./routes/login");
const query = require("./routes/query");

//setup passport authentication for sessions
const initializePassport = require("./passportConfig");
initializePassport(passport);

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8",
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

module.exports = function application(ENV, actions = { updateTask: () => {} }) {
  app.use(cors());
  app.use(helmet());
  app.use(bodyparser.json());
  app.use(flash());
  app.use(
    session({
      secret: "cats",
      resave: false,
      saveUninitialized: false,
    })
  );
  //set up passport then save for session
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", tasks(db, actions.updateTask));
  app.use("/api", users(db));
  app.use("/api", login(db));
  app.use("/api", query(db));

  if (ENV === "development" || ENV === "test") {
    Promise.all([
      read(path.resolve(__dirname, `db/schema/create.sql`)),
      read(path.resolve(__dirname, `db/seeds/reset.sql`)),
    ])
      .then(([create, seed]) => {
        app.get("/api/debug/reset", (request, response) => {
          db.query(create)
            .then(() => db.query(seed))
            .then(() => {
              console.log("Database Reset");
              response.status(200).send("Database Reset");
            });
        });
      })
      .catch((error) => {
        console.log(`Error setting up the reset route: ${error}`);
      });
  }

  app.close = function () {
    return db.end();
  };

  app.post("/logout", (req, res) => {
    console.log("ANYTHING? ", req.data);
    req.logOut();
    res.send("LOGOUT");
  });

  return app;
};
