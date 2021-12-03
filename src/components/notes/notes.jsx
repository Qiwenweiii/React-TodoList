import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

import noteService from "./services/notes";

import Note from "./note";
import Notification from "./notification";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
    // 第二个参数指定effect运行的频率，空数组表示只在第一次渲染时运行
    // effect就是第一个参数，即前面的箭头函数部分
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteObj).then((returnedNote) => {
      setNotes([...notes, returnedNote]);
      setNewNote("");
    });
  };

  const handeNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceof = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note ${note.content} was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceof(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handeNoteChange} />
        <button type="submit">save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "important" : "All"}
      </button>
    </div>
  );
};

export default Notes;
