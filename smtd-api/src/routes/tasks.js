const router = require("express").Router();

module.exports = (db, updateAppointment) => {
  router.get("/tasks", (request, response) => {
    db.query(
      `
      SELECT *
      FROM tasks
      GROUP BY user_id, category, created_on, tasks.id
      ORDER BY user_id
    `
    ).then(({ rows: tasks }) => {
      // console.log("RESP?", response);
      // console.log("TASKS?", tasks);
      response.json(
        tasks.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
  });

  // router.put("/tasks/:id", (request, response) => {
  //   if (process.env.TEST_ERROR) {
  //     setTimeout(() => response.status(500).json({}), 1000);
  //     return;
  //   }

  //   const { user, task } = request.body.interview;

  //   db.query(
  //     `
  //     INSERT INTO tasks (user_id, category, created_on) VALUES ($1::text, $2::integer, $3::date)
  //     ON CONFLICT (appointment_id) DO
  //     UPDATE SET student = $1::text, interviewer_id = $2::integer
  //   `,
  //     [student, interviewer, Number(request.params.id)]
  //   )
  //     .then(() => {
  //       setTimeout(() => {
  //         response.status(204).json({});
  //         updateAppointment(Number(request.params.id), request.body.interview);
  //       }, 1000);
  //     })
  //     .catch((error) => console.log(error));
  // });

  // router.delete("/appointments/:id", (request, response) => {
  //   if (process.env.TEST_ERROR) {
  //     setTimeout(() => response.status(500).json({}), 1000);
  //     return;
  //   }

  //   db.query(`DELETE FROM interviews WHERE appointment_id = $1::integer`, [
  //     request.params.id,
  //   ]).then(() => {
  //     setTimeout(() => {
  //       response.status(204).json({});
  //       updateAppointment(Number(request.params.id), null);
  //     }, 1000);
  //   });
  // });

  return router;
};
