import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("hello");
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData) => {
      console.log("returned promise");
      console.dir(myData);
      myData.push({ id: 1000, content: "this is fake note", important: true });
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
    let postPromise = noteService.create(myNote, user.token);
    postPromise
      .then((result) => {
        console.dir(result);
        console.log("note created data return", result.data);
        setNotes(notes.concat(result.data));
        setNewNote("");
      })
      .catch((error) => {
        setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification("");
        }, 2000);
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
    let currentNote = notes.find((note) => {
      return note.id === id;
    });
    let updatedNote = { ...currentNote, important: !currentNote.important };
    let putPromise = noteService.update(id, updatedNote);
    putPromise
      .then((result) => {
        console.dir(result);
        let updatedNote = result.data;
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      })
      .catch((err) => {
        console.log("some error here");
        console.dir(err);
        if (err.response.status === 404) {
          console.log("this means the id does not exist in the server");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      let loggedinUser = await loginService.login({
        username,
        password,
      });
      setUser(loggedinUser);
    } catch (error) {
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification("");
      }, 2000);
    }
  };

  const myStyle = { fontSize: "60px" };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const noteForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    );
  };

  return (
    <>
      <h1 style={myStyle} className="redbackground">
        Notes
      </h1>
      <Notification message={notification} />

      {user === null ? loginForm() : noteForm()}

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
    </>
  );
};

export default App;
