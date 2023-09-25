require("dotenv").config();
// const { Sequelize, QueryTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("sequelize");

const express = require("express");
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

Note.sync(); //! It create table accoding to your given schema

app.get("/api/notes", async (req, res) => {
  // const notes = await sequelize.query("SELECT * FROM notes", {  //! Using SQL command
  //   type: QueryTypes.SELECT,
  // });
  const notes = await Note.findAll(); //! Using mongoose type

  res.json(notes);
});

app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  // console.log(note.toJSON());
  console.log(JSON.stringify(note, null, 2));

  if (note) {
    res.json(note);
  } else {
    res.status(404).send("no data found");
  }
});

app.post("/api/notes", async (req, res) => {
  // console.log(req.body);
  const note = await Note.create(req.body);
  res.json(note);
});

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  console.log(note.toJSON());
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
