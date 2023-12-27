import "../App.css";

function NoteList({ notes, onDelete, onComplete, sortBy }) {

  let sortedNotes = notes;
  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(a.completed) - Number(b.completed)
    );



  return (
    <div>
      <div className="note-list">
        {sortedNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;

function NoteItem({ note, onDelete, onComplete }) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className={`note-item ${note.completed ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <div className="title">{note.title}</div>
          <div className="desc">{note.description}</div>
        </div>
        <div className="actions">
          <button onClick={() => onDelete(note.id)}>✖</button>
          <input 
            type="checkbox"
            className="checkbox"
            name={note.id}
            value={note.id}
            id={note.id}
            onChange={onComplete}
            checked={note.completed}
          />
        </div>
      </div>
      <hr />
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", dateOptions)}
      </div>

    </div>
  );
}
