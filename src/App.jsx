import "./App.css";
import { useState } from "react";
import AddNewNote from "./components/AddNewNote";
import NoteStatus from "./components/NoteStatus";
import NoteList from "./components/NoteList";
import NoteHeader from "./components/NoteHeader";


function App() {
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState("latest");

  const HandleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const HandleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  };

  const HandleCompleteNote = (e) => {
    const noteId = Number(e.target.value);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, completed: !note.completed } : note
      )
    );
  };


  return (
    <div>
      <div className="container">
        <div>
          <NoteHeader
            notes={notes}
            sortBy={sortBy}
            onSort={(e) => setSortBy(e.target.value)}
          />
        </div>
        <div className="note-app">
          <AddNewNote onAddNote={HandleAddNote} />
          <div className="notes-section">
            <NoteStatus notes={notes} />
            <NoteList
              notes={notes}
              sortBy={sortBy}
              onDelete={HandleDeleteNote}
              onComplete={HandleCompleteNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
