import { useParams } from "react-router-dom";

const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find((note) => note.id == id);

  return (
    <>
      <h2>This is single note for {id}</h2>

      <li>
        {note.content} <strong>{note.important ? "important" : ""}</strong>
      </li>
    </>
  );
};
export default Note;
