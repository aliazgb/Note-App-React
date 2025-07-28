import { useState } from "react";
import "./App.css";
import NoteApp from "./components/NoteApp";
import NoteHeader from "./components/NoteHeader";
import { NotesProvider } from "./context/NotesContext";
type sortBy = "latest" | "earliest" | "completed";
function App() {
  const [sortBy, setSortBy] = useState<sortBy>("latest");

  return (
    <NotesProvider>
      <div className="container">
        <NoteHeader sortBy={sortBy} onSort={(value) => setSortBy(value)} />
        <NoteApp sortBy={sortBy} />
      </div>
    </NotesProvider>
  );
}

export default App;
