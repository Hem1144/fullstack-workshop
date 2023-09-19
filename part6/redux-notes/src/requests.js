import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

export const getNotes = () =>
  axios.get(baseUrl).then((res) => {
    //! logical code here showing loding data
    // for (let i = 0; i < 1000000000; i++) {}
    return res.data;
  });

export const createNote = (newNote) =>
  axios.post(baseUrl, newNote).then((res) => res.data);

export const updateNote = (updatedNote) =>
  axios
    .put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    .then((res) => res.data);
