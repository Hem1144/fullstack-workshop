import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import noteReducer, {
  createNote,
  toggleImportantOf,
} from "./reducers/noteReducer";

const store = createStore(noteReducer);
store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    console.dir(event.target.myInput.value);

    const newNote = {
      content: event.target.myInput.value,
      important: true,
      id: store.getState().length + 1,
    };
    store.dispatch(createNote(newNote));
    event.target.myInput.value = "";
  };

  const toggleImportant = (id) => {
    store.dispatch(toggleImportantOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="myInput" />
        <button>Add note</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li
            key={note.id}
            onClick={() => {
              toggleImportant(note.id);
            }}
          >
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

store.subscribe(() => {
  root.render(<App />);
});
