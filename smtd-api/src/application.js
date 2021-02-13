const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

//PASSPORT STUFF
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
//strategy expecting a users file to export a function, findbyEmail
passport.use(
  new Strategy(function (email, password, cb) {
    db.users.findByEmail(email, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          console.log("USEREX, PASSBAD");
          return cb(null, false);
        }
        console.log("LOGGGGIN");
        return cb(null, user);
      });
    });
  })
);

const findByEmail = (email, cb) => {
  console.log("MADE IT IN", email);
  db.query(
    `
    SELECT * 
    FROM users 
    WHERE email = $1
    `,
    [email]
  ).then((data) => {
    console.log(data.rows[0]);
    if (data.rows[0]) {
      return cb(null, data.rows[0]);
    }
    return cb(null, null);
  });
};

const db = require("./db");

// console.log("DB:", db);

const tasks = require("./routes/tasks");
const users = require("./routes/users");
const login = require("./routes/login");
const {
  findByUsername,
} = require("../../../express-4.x-local-example/db/users");

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
  app.use(cors({ exposedHeaders: ["set-cookie"], credentials: true }));
  app.use(helmet());
  app.use(bodyparser.json());

  app.use("/api", tasks(db, actions.updateTask));
  app.use("/api", users(db));
  app.use("/api", login(db));

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

  return app;
};
