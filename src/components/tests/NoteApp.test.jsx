import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import NoteApp from "../NoteApp";
import { NotesProvider } from "../../context/NotesContext";

function addNote() {
    
}





test("Note App #1: should input be empty after submit", () => {
  render(
    <NotesProvider>
      <NoteApp sortBy={"latest"} />
    </NotesProvider>
  );
  const inputTitle = screen.getByPlaceholderText(/Note title/i);
  const inputDesc = screen.getByPlaceholderText(/Note description/i);
  fireEvent.change(inputTitle, { target: { value: "hello kos" } });
  fireEvent.change(inputDesc, { target: { value: "hello kon" } });
  const button = screen.getByRole("button", { name: /Add New Note/i });
  fireEvent.click(button);
  expect(inputTitle.value).toBe("");
});
