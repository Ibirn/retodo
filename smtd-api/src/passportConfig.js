const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("./db");

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
    if (data.rows[0]) {
      console.log("USEREXISTS", data.rows[0]);

      return cb(null, data.rows[0]);
    }
    console.log("NOSUCHUSER");
    return cb(null, null);
  });
};
/*
const findByEmail = (username, cb) => {
  console.log("MADE IT IN", username);
  db.query(
    `
    SELECT *
    FROM users
    WHERE name = $1
    `,
    [username]
  ).then((data) => {
    console.log("THIS YER USER??", data.rows[0]);
    if (data.rows[0]) {
      return cb(null, data.rows[0]);
    }
    return cb(null, null);
  });
};

const findById = (id, cb) => {
  if (id) {
    return cb(null, id);
  }
  return cb(null, null);
};
*/
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    console.log(done);
    //get user object or null with findbyemail
    await findByEmail(email, async (err, data) => {
      // if (err) {
      //   console.log("AUTHCBERR: ", err);
      // } else {
      //   console.log("?????", data);

      if (data === null) {
        return done(null, false, { message: "No user with email" });
      }
      try {
        if (await bcrypt.compare(password, data.password)) {
          console.log("IT DID IT");
          return done(null, data);
        } else {
          console.log("IT DIDN'T DO IT");
          return done(null, false, { message: "pass wrong" });
        }
      } catch (err) {
        return done(err);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {});
  passport.deserializeUser((id, done) => {});
}

module.exports = initialize;
