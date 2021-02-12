const router = require("express").Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  //issues with async
  const emailInUseCheck = async (email, callback) => {
    let check = await db.query(
      `
      SELECT * 
      FROM users 
      WHERE email = $1
      `,
      [email]
    );

    // console.log("yep", check.rows[0]);
    if (check.rows[0] === undefined) {
      return false;
    } else {
      return true;
    }
  };

  router.get("/users", (request, response) => {
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
    // console.log("???", request.body);
    const { username, email, password } = request.body;

    emailInUseCheck(email).then((res) => {
      if (!res) {
        bcrypt.hash(password, 10, function (err, hash) {
          db.query(
            `
              INSERT INTO users 
              (name, email, password)
              VALUES 
              ( $1, $2, $3);
      
              `,
            [username, email, hash]
          )
            .then(() => {
              response.status(204).json({});
            })
            .catch((error) => console.log(error));
        });
      } else {
        console.log("EMAIL IN USE");
      }
    });

    //
    //
  });

  return router;
};
