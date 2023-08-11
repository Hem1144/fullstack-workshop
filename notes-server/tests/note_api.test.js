const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 10000); //This time out is set for time-out error

test("there are two notes", async () => {
  const response = await api.get("/api/notes"); //api.get is the method of supertest

  expect(response.body).toHaveLength(2); //Jest framework
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  expect(response.body[0].content).toBe("HTML is easy");
});

afterAll(async () => {
  await mongoose.connection.close();
});
