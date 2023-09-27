import { useState } from "react";
import "./Todo.scss";

//! 수정 부분 다시 하기

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [readOnly, setReadOnly] = useState(true);

  const addTodo = () => {
    if (todo !== "") {
      const newTodo = {
        id: Date.now(),
        todo,
        done: false,
        checked: false,
      };
      setTodoList([...todoList, newTodo]);
      setTodo("");
    }
  };

  const checkTodo = (id) => {
    setTodoList(
      todoList.map((todo) => {
        return todo.id === id
          ? { ...todo, checked: !todo.checked, done: !todo.done }
          : todo;
      }),
    );
  };

  const editTodo = (id) => {
    setReadOnly(true);
    console.log(readOnly);
  };

  const removeTodo = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") setReadOnly(false);
    console.log(readOnly);
  };

  return (
    <div className="main">
      <form>
        <input
          type="text"
          placeholder="Add your new TODO"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="button" onClick={addTodo}>
          ADD
        </button>
      </form>
      <ul>
        {todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                name="todo"
                checked={todo.checked}
                done={todo.done}
                onChange={() => {
                  checkTodo(todo.id);
                }}
              />
              <input
                type="text"
                readOnly={todo.readOnly}
                value={todo.todo}
                onKeyDown={handleOnKeyDown}
                onClick={() => {
                  editTodo(todo.id);
                  // 수정 가능하게 -> e.target.value 써야 하나
                }}
              />
              <button
                onClick={() => {
                  removeTodo(todo.id);
                }}>
                X
              </button>
              <div>done: {todo.done}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
