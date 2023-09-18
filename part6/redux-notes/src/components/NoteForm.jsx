import { useSelector, useDispatch } from "react-redux";
import { createNote, makeNote } from "../reducers/noteReducer";

const NoteForm = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    console.dir(event.target.myInput.value);

    const newNote = {
      content: event.target.myInput.value,
      important: true,
      id: notes.length + 1,
    };
    dispatch(makeNote(newNote));
    event.target.myInput.value = "";
    // dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name="myInput" />
      <button>Add note</button>
    </form>
  );
};

export default NoteForm;
