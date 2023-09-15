import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
  return (
    <ul>
      {notes.map((note) => (
        <Link to={`/notes/${note.id}`} key={note.id}>
          <li>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default Notes;
