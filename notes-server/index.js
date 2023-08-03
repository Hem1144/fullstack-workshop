const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();

const url = process.env.MONGODB;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("Note", noteSchema);

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

const reqLogger = (req, resp, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  next();
};

app.use(reqLogger);

let notes = [];

app.get("/api/notes", (req, resp) => {
  Note.find({}).then((result) => {
    resp.json(result);
  });
});

app.get("/api/notes/:id", (req, resp, next) => {
  Note.findById(req.params.id)
    .then((result) => {
      if (result) {
        resp.json(result);
      } else {
        resp.status(404).send(`There are no notes at ${req.params.id}`);
      }
    })
    .catch((err) => {
      //Here handling middlewaew
      next(err);
      // console.log(err);
      // resp.status(500).send(`${req.params.id} is not a expected format`);
    });
});

app.put("/api/notes/:id", (req, resp) => {
  const myId = Number(req.params.id);
  const updatedNote = req.body;
  let noteFound = false;
  notes = notes.map((note) => {
    if (note.id !== myId) return note;
    else {
      noteFound = true;
      return updatedNote;
    }
  });

  if (noteFound) {
    resp.status(202).json(updatedNote);
  } else {
    resp.status(404).send(`There are no notes at ${myId}`);
  }
});

app.delete("/api/notes/:id", (req, resp) => {
  const myId = Number(req.params.id);
  notes = notes.filter((note) => note.id !== myId);

  resp.status(204).send(`The note at id ${myId} has been deleted`);
});

app.post("/api/notes", (req, resp) => {
  const myNewPost = req.body;
  myNewPost.id = notes.length + 1;
  notes.push(myNewPost);
  resp.status(201).json(myNewPost);
});

app.use((req, resp, next) => {
  resp.status(404).send("No code is available for your server");
});

//Error handling function
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// "build:ui": "cd src && rm -rf dist && rm -rf ../../notes-server/dist && npm run build && cp -r dist ../../notes-server"
