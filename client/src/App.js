import { useEffect, useState } from "react";
import axios from "axios";
import "./scss/Todo.scss";
import Spinner from "./assets/Spinner.svg";

function App() {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const addTodo = async () => {
    if (title !== "") {
      try {
        const add = await axios.post("http://localhost:8000/todo", { title });
        if (add.data.result) {
          const newTodo = {
            id: add.data.todo.id,
            title,
            done: false,
            readOnly: true,
          };
          setTodoList([...todoList, newTodo]);
          setTitle("");
          setShowNotification(true); //알림창 표시
          setTimeout(() => {
            setShowNotification(false);
          }, 2000);
        }
      } catch (error) {
        console.log("Error adding todo", error);
      }
    }
  };

  const handleOnKeyDownAdd = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const checkTodo = async (id) => {
    try {
      const checked = await axios.patch(`http://localhost:8000/todo/${id}`, {
        done: !todoList.find((item) => item.id === id).done,
      });
      if (checked.data.result) {
        setTodoList(
          todoList.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        );
      }
    } catch (error) {
      console.log("Error checking todo: ", error);
    }
  };

  const handleItemClick = (id) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, readOnly: false } : item,
      ),
    );
  };

  const handleTitleChange = (id, value) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, title: value } : item,
      ),
    );
  };

  const handleOnKeyDown = async (e, id) => {
    if (e.key === "Enter" || e.key === "Return") {
      const item = todoList.find((item) => item.id === id);
      if (item)
        try {
          const edit = await axios.patch(`http://localhost:8000/todo/${id}`, {
            title: item.title,
          });
          if (edit.data.result) {
            setTodoList(
              todoList.map((item) => {
                return item.id === id ? { ...item, readOnly: true } : item;
              }),
            );
          }
        } catch (error) {
          console.log("Error editing todo: ", error);
        }
    }
  };

  const removeTodo = async (id) => {
    try {
      const remove = await axios.delete(`http://localhost:8000/todo/${id}`);
      if (remove.data.result) {
        setTodoList(todoList.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.log("Error removing todo: ", error);
    }
  };

  useEffect(() => {
    const todoData = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "http://localhost:8000/todos",
        });
        console.log(res.data.data);
        const todos = res.data.todos || []; // 데이터 없으면 빈 배열
        const todoItems = todos.map((item) => ({ ...item, readOnly: true }));
        setTodoList(todoItems);
      } catch (error) {
        console.log("error", error);
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };
    todoData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <img src={Spinner} alt="Spinner" />
          Loading...
        </div>
      ) : (
        <div className="main">
          {showNotification && (
            <div className="notification show">할 일이 추가되었습니다</div>
          )}
          <div className="Title">My Todo List</div>
          <form className="AddTodo">
            <input type="text" style={{ display: "none" }} />
            <input
              type="text"
              placeholder="Add your new TODO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                handleOnKeyDownAdd(e); // enter키 누를 때 업데이트 요청
              }}
            />
            <button type="button" onClick={addTodo}>
              ADD
            </button>
          </form>
          <ul>
            {todoList &&
              todoList.map((item) => {
                return (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      name="todo"
                      checked={item.done}
                      id="checkLabel"
                      onChange={() => {
                        checkTodo(item.id);
                      }}
                    />

                    <input
                      type="text"
                      value={item.title}
                      readOnly={item.readOnly}
                      onClick={() => {
                        handleItemClick(item.id); // 클릭 시 readOnly: false
                      }}
                      onChange={(e) => {
                        handleTitleChange(item.id, e.target.value); // 입력 필드 값 update
                      }}
                      onKeyDown={(e) => {
                        handleOnKeyDown(e, item.id); // enter키 누를 때 업데이트 요청
                      }}
                    />
                    <button
                      onClick={() => {
                        removeTodo(item.id);
                      }}>
                      X
                    </button>
                    {/* readOnly 값이 바뀌는지 확인 */}
                    {/* {console.log(`${item.id}의 readOnly`, item.readOnly)} */}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
