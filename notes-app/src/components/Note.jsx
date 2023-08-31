const Note = ({ note, updateNote }) => {
  return (
    <li className="note">
      {note.content}{" "}
      <button onClick={updateNote}>
        please change {note.important ? "true" : "false"}
      </button>
    </li>
  );
};

export default Note;
