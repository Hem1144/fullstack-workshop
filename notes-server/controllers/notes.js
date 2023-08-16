const app = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");

app.get("/", async (req, resp) => {
  let result = await Note.find({}).populate("user", { username: 1, name: 1 });
  resp.json(result);
});

app.get("/:id", async (req, resp, next) => {
  try {
    const result = await Note.findById(req.params.id);

    if (result) {
      resp.json(result);
    } else {
      resp.status(404).send(`There are no notes at ${req.params.id}`);
    }
  } catch (error) {
    //Here handling middlewaew
    next(error);
    // console.log(err);
    // resp.status(500).send(`${req.params.id} is not a expected format`);
  }
});

app.put("/:id", async (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
      new: true,
      runValidators: true,
    });

    // Return only the relevant data from the updated note
    response.json({
      id: updatedNote.id,
      content: updatedNote.content,
      important: updatedNote.important,
    });
  } catch (error) {
    next(error);
  }
});

app.delete("/:id", async (request, response, next) => {
  try {
    Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/", async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  //TODO: Don't use "express-async-error"
  try {
    const savedNote = await note.save(); //! ".save" returns promise here
    response.status(201).json(savedNote);
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
  } catch (e) {
    next(e);
  }
});

module.exports = app;
