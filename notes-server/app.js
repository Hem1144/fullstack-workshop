const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const notesController = require("./controllers/notes");
const usersController = require("./controllers/users");
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

app.use(noHandlers);

app.use(errorHandler);

module.exports = app;
