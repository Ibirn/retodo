const router = require("express").Router();
const passport = require("passport");
const { checkNotAuth } = require("../authHelpers");

module.exports = (db) => {
  router.post(
    "/login",
    checkNotAuth,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: true,
    })
  );

  return router;
};
