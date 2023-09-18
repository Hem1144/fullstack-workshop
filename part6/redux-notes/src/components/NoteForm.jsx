import { useSelector, useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import noteService from "../services/notes";

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
    noteService.createNew(newNote).then((myNote) => {
      dispatch(createNote(myNote));
    });
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
