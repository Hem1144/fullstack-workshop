const noteReducer = (state = [], action) => {
  console.log("Action is ", action);
  console.log("State is", state);
  switch (action.type) {
    case "NEW_NOTE": {
      const newState = state.concat(action.payload);
      return newState;
    }
    case "TOGGLE_IMPORTANCE": {
      let myNote = state.find((note) => note.id === action.payload);
      let changedNote = { ...myNote, important: !myNote.important };
      // changedNote.important = !changedNote.important;
      return state.map((note) =>
        note.id === changedNote.id ? changedNote : note
      );
    }

    default:
      return state;
  }
};

const createNote = (newNote) => {
  return {
    type: "NEW_NOTE",
    payload: newNote,
  };
};

const toggleImportantOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: id,
  };
};

export { createNote, toggleImportantOf };

export default noteReducer;
