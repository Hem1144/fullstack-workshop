const app = require("express").Router();
const Note = require("../models/note");

app.get("/", async (req, resp) => {
  let result = await Note.find({});
  resp.json(result);
});

app.get("/:id", (req, resp, next) => {
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

app.put("/:id", (request, response, next) => {
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

app.delete("/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/", async (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  //TODO: Don't use "express-async-error"
  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
