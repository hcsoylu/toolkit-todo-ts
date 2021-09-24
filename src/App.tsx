import { useState } from "react";
import { add, remove, toggleCompleted } from "./features/todoSlice";
import { fetchUser } from "./features/userSlice";
import { useAppDispatch, useAppSelector } from "./store";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const user = useAppSelector((state) => state.user);

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
      <div>
        <button onClick={() => dispatch(fetchUser())}>fetch user</button>
        {user.loading && "loading"}
        {user.error && user.error}
        {user.data && <div>Name : {user.data.results[0].name.first}</div>}
      </div>
    </div>
  );
}

export default App;
