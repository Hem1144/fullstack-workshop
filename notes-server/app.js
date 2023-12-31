const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesController = require("./controllers/notes");
const usersController = require("./controllers/users");
const loginController = require("./controllers/login");
const { url } = require("./utils/config");
const { errorHandler, noHandlers, reqLogger } = require("./utils/middleware");
// const { info } = require("./utils/logger");

mongoose.set("strictQuery", false);
mongoose.connect(url);

// info("NODE_ENV is", process.env.NODE_ENV);

// const note = new Note({
//   content: "HTML is Easy",
//   important: false,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.use(reqLogger);

app.use("/api/notes", notesController);
app.use("/api/users", usersController);
app.use("/api/login", loginController); //Anytime "/api/login" path called loginController fulfilled the request

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(noHandlers);

app.use(errorHandler);

module.exports = app;
