import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    console.log("hello");
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData) => {
      console.log("returned promise");
      console.dir(myData);
      myData.push({ id: 1000, content: "this is fake note", important: true });
      setNotes(myData);
    });

    //! Lets get user from localStorage if available
    let myUser = window.localStorage.getItem("noteUser");

    if (myUser) {
      setUser(JSON.parse(myUser));
    }

    console.log(myAxiosPromise);
  }, []);

  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const handleSubmit = (newNote) => {
    noteFormRef.current.toggleVisibility();

    let postPromise = noteService.create(newNote, user.token);
    postPromise
      .then((result) => {
        console.dir(result);
        console.log("note created data return", result.data);
        setNotes(notes.concat(result.data));
      })
      .catch((error) => {
        setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification("");
        }, 2000);
        if (error.response.data.error === "token expired") {
          setUser(null);
          window.localStorage.removeItem("noteUser");
        }
      });
    console.log("form has been submitted");
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
      window.localStorage.setItem("noteUser", JSON.stringify(loggedinUser));
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
      <>
        <Togglable buttonLabel="show login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm onSubmit={handleSubmit} />
      </Togglable>
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
