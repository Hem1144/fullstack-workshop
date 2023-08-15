const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Note = require("../models/note");
const helpers = require("./test_helper");

// beforeEach(async () => {
//   await Note.deleteMany({});
//   //! Here we create a new note and save.
//   let noteObject = new Note(helpers.initialNotes[0]);
//   await noteObject.save();
//   noteObject = new Note(helpers.initialNotes[1]);
//   await noteObject.save();
// }, 10000); //Here additionally set the timer to aachive the test cases

beforeEach(async () => {
  await Note.deleteMany({});
  const noteObjects = helpers.initialNotes.map((note) => new Note(note));
  const promiseArray = noteObjects.map((note) => note.save());
  await Promise.all(promiseArray); //! It resolve array of Promises using single
}, 10000);

const api = supertest(app);

describe("Testing GET method", () => {
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

    const contents = response.map((r) => r.content);

    expect(contents).toContain(helpers.initialNotes[0].content);
  });
});

describe("Testing POST method", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");

    const contents = response.body.map((r) => r.content);

    expect(response.body).toHaveLength(helpers.initialNotes.length + 1);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("note without content is not added", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(helpers.initialNotes.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
