import React, { useState } from "react";
import todosData from "./todos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(todosData);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };

    setTodos([newItem, ...todos]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1> To-Dos</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTodo}
          placeholder="write here!"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>add+</button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>completed</button>
        <button onClick={() => setFilter("uncompleted")}>uncompleted</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo, index) => (
          <li
            key={todo.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#aaa" : "#000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ marginLeft: "10px" }}>
                {index + 1}. {todo.title}
              </span>
            </div>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
