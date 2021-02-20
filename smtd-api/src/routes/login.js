const router = require("express").Router();
const passport = require("passport");
const { checkNotAuth } = require("../authHelpers");

module.exports = (db) => {
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/register",
      session: true,
    }),
    (req, res) => {
      console.log(req.user);
    }
  );

  return router;
};
