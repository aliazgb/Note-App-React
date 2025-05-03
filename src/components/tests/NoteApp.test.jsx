import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { NotesProvider } from "../../context/NotesContext";
import NoteApp from "../NoteApp";

function addNote(note) {
  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  const inputDesc = screen.getByPlaceholderText(/Note description/i);
  const button = screen.getByRole("button", { name: /Add New Note/i });

  note.forEach((n) => {
    fireEvent.change(inputTitle, { target: { value: n.title } });
    fireEvent.change(inputDesc, { target: { value: n.des } });
    fireEvent.click(button);
  });
}

test("Note App #1: should input be empty after submit", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy={"latest"} />
    </NotesProvider>
  );

  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  expect(inputTitle.value).toBe("");

  addNote([
    {
      title: "Hello this is test title",
      des: "Hello this is test description",
    },
  ]);
});
