import { useContext } from "react";
import { ToDoContext } from "../contexts/ToDoContext";

export function useToDo() {
  const context = useContext(ToDoContext);

  if (!context) throw new Error("useToDo must be used inside ToDoProvider!");
  return context;
}
