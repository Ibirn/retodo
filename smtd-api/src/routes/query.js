const router = require("express").Router();
const passport = require("passport");

module.exports = (db) => {
  router.post("/query", (req, res) => {
    console.log(req.body);
  });
  return router;
};
