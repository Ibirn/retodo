const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("./db");

const getUserByEmail = (email, cb) => {
  // console.log("MADE IT IN", email);
  db.query(
    `
    SELECT *
    FROM users
    WHERE email = $1
    `,
    [email]
  ).then((data) => {
    if (data.rows[0]) {
      // console.log("GETEMAILEXISTS", data.rows[0]);

      return cb(null, data.rows[0]);
    }
    // console.log("NOSUCHEMAIL");
    return cb(null, null);
  });
};

const getUserById = (id, cb) => {
  // console.log("GETIDCHECK: ", id);
  db.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [id]
  ).then((data) => {
    if (data.rows[0]) {
      // console.log("GETUSEREXISTS", data.rows[0]);

      return cb(null, data.rows[0]);
    }
    // console.log("NOSUCHUSER");
    return cb(null, null);
  });
};

function initialize(passport) {
  //this gets called with passport
  const authenticateUser = async (email, password, done) => {
    //get user object or null with findbyemail
    await getUserByEmail(email, async (err, data) => {
      if (data === null) {
        //no user, no error
        // console.log("NO USER, NO ERR");
        return done(null, false, { message: "No user with email" });
      }
      try {
        if (await bcrypt.compare(password, data.password)) {
          //user and password match
          // console.log("LOGIN SUCC");
          return done(null, data);
        } else {
          //user and password do not match
          // console.log("BAD PASS");
          return done(null, false, { message: "pass wrong" });
        }
      } catch (err) {
        //error
        // console.log("ERR");
        return done(err);
      }
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    // console.log("SERIALISE: ", user);
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    await getUserById(id, (err, data) => {
      // console.log("GOT ID: ", id);
      // console.log("DESERIALDAT: ", data);

      return done(null, data);
    });
  });
}

module.exports = initialize;
