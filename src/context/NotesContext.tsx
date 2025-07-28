import React, { createContext, useContext, useReducer } from "react";

type NewNote = {
  title: string;
  description: string;
  id: number;
  completed: boolean;
  createdAt: string;
};
type NotesContextType = NewNote[];
type NotesDispatchContextType = React.Dispatch<Action>;

const NotesContext = createContext({} as NotesContextType);
const NotesDispatchContext = createContext({} as NotesDispatchContextType);

type Action =
  | { type: "add"; payload: NewNote }
  | { type: "delete"; payload: number }
  | { type: "complete"; payload: number };

function notesReducer(notes: NewNote[], action: Action) {
  switch (action.type) {
    case "add": {
      return [...notes, action.payload];
    }
    case "delete": {
      return notes.filter((s) => s.id !== action.payload);
    }
    case "complete": {
      return notes.map((note) =>
        note.id === action.payload
          ? { ...note, completed: !note.completed }
          : note
      );
    }
    default:
      throw new Error("unknown action" + action);
  }
}

type Props = {
  children: React.ReactNode;
};

export function NotesProvider({ children }: Props) {
  const [notes, dispatch] = useReducer(notesReducer, []);
  return (
    <NotesContext.Provider value={notes}>
      <NotesDispatchContext.Provider value={dispatch}>
        {children}
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}

export function useNotesDispatch() {
  return useContext(NotesDispatchContext);
}
