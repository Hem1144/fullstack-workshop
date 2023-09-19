import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import services from "./services/notes";
import { createNote } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  // const [filter, setFilter] = useState("ALL");
  useEffect(() => {
    services.getAll().then((response) => {
      dispatch(createNote(response));
    });
  }, []);

  return (
    <>
      <VisibilityFilter />
      <NoteForm />
      <Notes />
    </>
  );
};

export default App;
