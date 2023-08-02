import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    console.log("hello");
    //1. get data from backend server
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData) => {
      console.log("returned promise");
      console.dir(myData);
      myData.push({ id: 1000, content: "this is fake note", important: true });
      //2. put the data into notes state
      setNotes(myData);
    });

    console.log(myAxiosPromise);
  }, []);

  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const handleSubmit = (event) => {
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    let postPromise = noteService.create(myNote);
    postPromise.then((result) => {
      console.dir(result);
      console.log("note created data return", result.data);
      setNotes(notes.concat(result.data));
      setNewNote("");
    });
    console.log("form has been submitted");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const updateData = (id) => {
    //1. update the server
    let currentNote = notes.find((note) => {
      return note.id === id;
    });
    let updatedNote = { ...currentNote, important: !currentNote.important };
    let putPromise = noteService.update(id, updatedNote);
    putPromise
      .then((result) => {
        console.dir(result);
        let updatedNote = result.data;
        //2. update the state
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      })
      .catch((err) => {
        console.log("some error here");
        console.dir(err);
        if (err.response.status === 404) {
          console.log("this means the id does not exist in the server");
          // alert(`sorry this note "${currentNote.content}" does not exist`);
          setNotification(
            `sorry this note "${currentNote.content}" does not exist`
          );
          setTimeout(() => {
            setNotification("");
          }, 2000);
          setNotes(notes.filter((note) => note.id !== currentNote.id));
        } else {
          console.log("this is some other error");
        }
      });
  };

  const myStyle = { fontSize: "60px" };

  return (
    <>
      <h1 style={myStyle} className="redbackground">
        Notes
      </h1>
      <Notification message={notification} />
      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((value) => {
          return (
            <Note
              key={value.id}
              note={value}
              updateNote={() => {
                updateData(value.id);
              }}
            />
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default App;
