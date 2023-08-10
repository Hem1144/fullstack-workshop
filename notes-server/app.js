const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { url } = require("./utils/config");
const { errorHandler, noHandlers, reqLogger } = require("./utils/middleware");

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  //Directly error handling validation applied here
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model("demo", noteSchema);

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
    .catch((error) => {
      //Here handling middlewaew
      next(error);
      // console.log(err);
      // resp.status(500).send(`${req.params.id} is not a expected format`);
    });
});

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    //! We have to use "runValidators: true" for resolving error in PUT method
    runValidators: true,
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((e) => {
      next(e);
    });
});

app.use(noHandlers);

app.use(errorHandler);

module.exports = app;
