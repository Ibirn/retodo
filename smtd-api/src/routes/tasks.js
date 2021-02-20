const router = require("express").Router();
const passport = require("passport");
const { checkAuth, checkNotAuth } = require("../authHelpers");

module.exports = (db, updateAppointment) => {
  router.get("/tasks", checkAuth, (request, response) => {
    console.log("TASKUS:", request.user);
    if (request.user.id) {
      db.query(
        `
        SELECT *
        FROM tasks
  
        WHERE user_id = $1
        GROUP BY user_id, category, created_on, tasks.id
        ORDER BY user_id
      `,
        [request.user.id]
      ).then(({ rows: tasks }) => {
        // console.log("USER: ", tasks);

        // let list = tasks.reduce(
        //   (previous, current) => ({ ...previous, [current.id]: current }),
        //   {}
        // );

        response.json({
          tasks: tasks,
          user: request.user.name,
        });
      });
    } else {
      response.sendStatus(403);
    }
  });

  return router;
};
