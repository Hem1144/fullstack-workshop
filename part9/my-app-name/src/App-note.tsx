import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";

interface Note {
  id: number;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: "my new note" },
  ]); //! Normally we declare generic in the place of function call

  useEffect(() => {
    axios.get<Note[]>("http://localhost:3001/notes").then((response) => {
      const data = response.data;
      setNotes(data);
    });
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post<Note>("http://localhost:3001/notes", { content: newNote })
      .then((result) => setNotes([...notes, result.data]));
    setNotes([...notes, { id: notes.length + 1, content: newNote }]);
    setNewNote("");
  };

  return (
    <>
      {notes.map((value) => (
        <div key={value.id}>{value.content}</div>
      ))}

      <form onSubmit={handleSubmit}>
        {/* value attribute is required for controlled form */}
        <input
          type="text"
          value={newNote}
          onChange={(e) => {
            setNewNote(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default App;
