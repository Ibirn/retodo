const router = require("express").Router();
const passport = require("passport");
// const Strategy = require("passport-local").Strategy;

module.exports = (db) => {
  // const collapse = {
  //strategy expecting a users file to export a function, findbyEmail
  // passport.use(
  //   new Strategy(function (email, password, cb) {
  //     findByEmail(email, function (err, user) {
  //       if (err) {
  //         return cb(err);
  //       }
  //       if (!user) {
  //         return cb(null, false);
  //       }
  //       bcrypt.compare(password, user.password).then((result) => {
  //         if (!result) {
  //           console.log("USEREX, PASSBAD");
  //           return cb(null, false);
  //         }
  //         console.log("LOGGGGIN");
  //         return cb(null, user);
  //       });
  //     });
  //   })
  // );

  // const findByEmail = (email, cb) => {
  //   console.log("MADE IT IN", email);
  //   db.query(
  //     `
  //     SELECT *
  //     FROM users
  //     WHERE email = $1
  //     `,
  //     [email]
  //   ).then((data) => {
  //     console.log(data.rows[0]);
  //     if (data.rows[0]) {
  //       return cb(null, data.rows[0]);
  //     }
  //     return cb(null, null);
  //   });
  // };}

  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: true,
    }),
    function (req, res) {
      console.log("THIS HAPPENING");
      res.redirect("/");
    }
  );

  return router;
};
