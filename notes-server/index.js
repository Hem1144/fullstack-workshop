const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  next();
};

app.use(requestLogger);

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

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const myId = Number(request.params.id);
  const myNote = notes.find((note) => note.id === myId);

  if (myNote) {
    response.json(myNote);
  } else {
    response.status(404).send(`There are no notes at ${myId}`);
  }
});

app.put("/api/notes/:id", (request, response) => {
  const myId = Number(request.params.id);
  const updatedNote = request.body;
  let noteFound = false;
  notes = notes.map((note) => {
    if (note.id !== myId) return note;
    else {
      noteFound = true;
      return updatedNote;
    }
  });

  if (noteFound) {
    response.status(202).json(updatedNote);
  } else {
    response.status(404).send(`There are no notes at ${myId}`);
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const myId = Number(request.params.id);
  notes = notes.filter((note) => note.id !== myId);

  response.status(204).send(`The note at id ${myId} has been deleted`);
});

app.post("/api/notes", (request, response) => {
  const myNewPost = request.body;
  myNewPost.id = notes.length + 1;
  notes.push(myNewPost);
  response.status(201).json(myNewPost);
});

app.use((request, response, next) => {
  response.status(404).send("no code available to hande this request");
});

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
