const express = require("express");
const app = express();
const cors = require("cors");

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

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/api/notes", (req, resp) => {
  resp.json(notes);
});

app.get("/api/notes/:id", (req, resp) => {
  const myId = Number(req.params.id);
  const myNote = notes.find((note) => note.id === myId);

  if (myNote) {
    resp.json(myNote);
  } else {
    resp.status(404).send(`There are no notes at ${myId}`);
  }
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

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
