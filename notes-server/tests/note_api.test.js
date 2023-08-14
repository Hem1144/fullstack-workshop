const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");
const helpers = require("./test_helper");

beforeEach(async () => {
  await Note.deleteMany({});
  //! Here we create a new note and save.
  let noteObject = new Note(helpers.initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(helpers.initialNotes[1]);
  await noteObject.save();
}, 10000); //Here additionally set the timer to aachive the test cases

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000); //This time out is set for time-out error

test("there are two notes", async () => {
  const response = await helpers.notesInDb(); //api.get is the method of supertest

  expect(response).toHaveLength(helpers.initialNotes.length); //Jest framework
});

//! We can run only one test by adding .only keyword
test("the first note is about HTTP methods", async () => {
  const response = await helpers.notesInDb();

  expect(response[0].content).toBe(helpers.initialNotes[0].content);
});

test("a note without content cannot be added", async () => {
  const newNote = {
    important: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(helpers.initialNotes.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
