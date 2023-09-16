import { createSlice } from "@reduxjs/toolkit";
// import noteReducer from "./noteReducer";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const noteReducer = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote(state, action) {
      const newState = state.concat(action.payload);
      return newState;
    },
    toggleImportantOf(state, action) {
      let myNote = state.find((note) => note.id === action.payload);
      let changedNote = { ...myNote, important: !myNote.important };
      // changedNote.important = !changedNote.important;
      return state.map((note) =>
        note.id === changedNote.id ? changedNote : note
      );
    },
  },
});

// const noteReducer = (state = initialState, action) => {
//   console.log("Action is ", action);
//   console.log("State is", state);
//   switch (action.type) {
//     case "NEW_NOTE": {
//       const newState = state.concat(action.payload);
//       return newState;
//     }
//     case "TOGGLE_IMPORTANCE": {
//       let myNote = state.find((note) => note.id === action.payload);
//       let changedNote = { ...myNote, important: !myNote.important };
//       // changedNote.important = !changedNote.important;
//       return state.map((note) =>

//         note.id === changedNote.id ? changedNote : note
//       );
//     }

//     default:
//       return state;
//   }
// };

// const createNote = (newNote) => {
//   return {
//     type: "NEW_NOTE",
//     payload: newNote,
//   };
// };

// const toggleImportantOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: id,
//   };
// };

export const { createNote, toggleImportantOf } = noteReducer.actions;

export default noteReducer.reducer;
