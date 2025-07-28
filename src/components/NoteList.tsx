import { useNotes, useNotesDispatch } from "../context/NotesContext";
import { NewNote } from "../types/Notes";

type NoteItemProps = {
  note: NewNote;
};
type SortByType = { sortBy: "latest" | "earliest" | "completed" };
function NoteList({ sortBy }: SortByType) {
  const notes = useNotes();
  let sortedNotes = notes;

  if (sortBy === "earliest")
    sortedNotes = [...notes].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ); // a -b  => a > b ? 1 : -1

  if (sortBy === "latest")
    sortedNotes = [...notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ); // b -a  => a > b ? -1 : 1

  if (sortBy === "completed")
    sortedNotes = [...notes].sort(
      (a, b) => Number(b.completed) - Number(a.completed)
    );

  return (
    <div className="note-list">
      {sortedNotes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;

function NoteItem({ note }: NoteItemProps) {
  const dispatch = useNotesDispatch();
  console.log(note);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div
      data-testid="note-item"
      className={`note-item ${note.completed ? "completed" : ""}`}
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch({ type: "delete", payload: note.id })}
          >
            ❌
          </button>
          <input
            type="checkbox"
            name={String(note.id)}
            id={String(note.id)}
            value={note.id}
            checked={note.completed}
            onChange={(e) => {
              const noteId = Number(e.target.value);
              dispatch({ type: "complete", payload: noteId });
            }}
          />
        </div>
      </div>
      <p className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("en-US", options)}
      </p>
    </div>
  );
}
