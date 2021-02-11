const router = require("express").Router();
const bcrypt = require("bcrypt");

//add email check

module.exports = (db) => {
  router.get("/users", (request, response) => {
    // console.log(req.body);
    const { email, password } = request.body;
    db.query(
      `
      SELECT name
      FROM users
      `
      // WHERE password = $1
      // AND email = $2
    )
      .then(({ rows: users }) => {
        // console.log("data?", data.rows);
        response.json(users);
      })
      .catch((error) => console.log("ERROR:", error));
  });

  router.post("/users", (request, response) => {
    console.log("???", request.body);
    const { username, email, password } = request.body;
    bcrypt.hash(password, 10, function (err, hash) {
      db.query(
        `
        INSERT INTO users (name, email, password)
        VALUES ( $1, $2, $3);

        `,
        [username, email, hash]
      );
    });
  });

  return router;
};
