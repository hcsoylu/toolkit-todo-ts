import { useState } from "react";
import { add, remove, toggleCompleted } from "./features/todoSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    dispatch(add(title));
    setTitle("");
  };

  const onDelete = (id: string) => {
    dispatch(remove(id));
  };

  const toggle = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="App">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <button onClick={onSave}>Save</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.title}>
            <button onClick={() => toggle(todo.id)}>
              {!todo.completed ? "completed" : "not completed"}
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
            <span style={{ marginLeft: "20px" }}>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
