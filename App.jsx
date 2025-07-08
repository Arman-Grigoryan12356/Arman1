import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const debounceRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const fetchTodos = async (searchTerm) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = response.data.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(async () => {
      const filtered = await fetchTodos(value);
      setTodos(filtered);
    }, 500);
  };

  return (
    <>
      <h1>TODOS</h1>
      <input
        type="text"
        placeholder="search your todo"
        onChange={handleSearch}
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
