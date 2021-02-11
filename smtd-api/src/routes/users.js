const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {
    const { email, password } = req.body;
    db.query(
      `
      SELECT name
      FROM users
      WHERE password = $1
      AND email = $2
      `
    )
      .then((data) => {
        console.log("data?", data);
      })
      .catch((error) => console.log("ERROR:", error));
  });
  return router;
};
