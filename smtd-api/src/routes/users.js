const router = require("express").Router();
const bcrypt = require("bcrypt");

module.exports = (db) => {
  const emailInUseCheck = async (email, callback) => {
    let check = await db.query(
      `
      SELECT * 
      FROM users 
      WHERE email = $1
      `,
      [email]
    );

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
        response.json(users);
      })
      .catch((error) => console.log("ERROR:", error));
  });

  router.post("/users", (request, response) => {
    const { username, email, password } = request.body;

    findByEmail(email, (err, data) => {
      if (err) {
        console.log("ERRCB");
      } else {
        console.log("CBSUCC", data);
      }
    });

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
              // response.cookie(thing, "whateversS");
              // response.cookie("ham", "sandiwch");
              response.redirect("/");
            })
            .catch((error) => console.log(error));
        });
      } else {
        response.send("ERROR - Email is already in use.");
      }
    });
  });

  return router;
};
