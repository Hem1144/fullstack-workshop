const app = require("express").Router();
const { Note } = require("../models/");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

app.get("/", async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", {  //! Using SQL command
  //   type: QueryTypes.SELECT,
  // });
  const notes = await Note.findAll(); //! Using mongoose type
  res.json(notes);
});

app.get("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  // console.log(note.toJSON());
  console.log(JSON.stringify(req.note, null, 2));

  if (req.note) {
    res.json(req.note);
  } else {
    res.status(404).send("no data found");
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  const note = await Note.create(req.body);
  res.json(note);
});

app.put("/:id", noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id);
  console.log(note.toJSON());
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();

    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

module.exports = app;
