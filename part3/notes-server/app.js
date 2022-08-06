const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const Note = require("./models/note");

const App = express();
App.use(express.static("build"));
App.use(cors());
App.use(express.json());

App.use(middleware.requestLogger);

// App.use(express.json());
App.use("/api/notes", notesRouter);
App.use("/api/users", usersRouter);
App.use("/api/login", loginRouter);
App.use(middleware.unknownEndpoint);

App.use(middleware.errorHandler);
// this has to be the last loaded middleware.
module.exports = App;
