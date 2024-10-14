import express from "express";

const app = express();

import bodyParser from "body-parser";
import usersRoutes from "./api/routes/users.js";
import divesRoutes from "./api/routes/dives.js";

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/users", usersRoutes);
app.use("/dives", divesRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
