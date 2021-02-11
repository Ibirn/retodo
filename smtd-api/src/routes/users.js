const router = require("express").Router();

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
  });

  return router;
};
