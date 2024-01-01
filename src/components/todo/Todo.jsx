import "./todo.css";
import { DisplayTodo } from "./DisplayTodo";
import currentDateTime from "../GetDateAndTime";
import { useState, useEffect } from "react";
import axios from "axios";

function Todo() {
  const [todoTask, setTodoTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEmptyTask, setIsEmptyTask] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(currentDateTime);
  const [buttonText, setButtonText] = useState("Add Task");

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000 + 1);
  }

  async function getTodos() {
    const receivedtodos = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/todos`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err);
      });

    if (receivedtodos.status === 200) {
      //auth successful now setTodos
      // console.log("receivedtodos", receivedtodos);
      setTodos(receivedtodos.data.todos);
    }
  }

  useEffect(() => {
    getTodos(currentDateTime);
  }, []);

  useEffect(() => {
    getTodos();
  }, [selectedDateTime]);

  async function handleTodoTaskSubmit(ev) {
    ev.preventDefault();

    setButtonText("Add Task");

    if (todoTask === "") {
      setIsEmptyTask(true);
    } else {
      //making todo using id and todoTask and date and time.

      // Convert the selected date and time to Unix timestamp
      const unixTimestamp = Date.parse(selectedDateTime) / 1000;

      const todo = {
        id: generateRandomNumber(),
        value: todoTask,
        time: unixTimestamp,
      };
      //send todo to backend
      const addedtodo = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/addtodo`,
          { todo },
          { withCredentials: true }
        )
        .catch((err) => {
          console.log(err);
        });

      if (addedtodo.status === 200) {
        setTodoTask("");
        setIsEmptyTask(false);
        getTodos();
      }
    }
  }

  return (
    <div className="todo">
      <div className="todoContainer">
        {isEmptyTask && (
          <div className="todoError">Error! Empty task cannot be added.</div>
        )}
        <DisplayTodo
          todos={todos}
          setTodoTask={setTodoTask}
          setSelectedDateTime={setSelectedDateTime}
          setButtonText={setButtonText}
          setIsEmptyTask={setIsEmptyTask}
          getTodos={getTodos}
        />
        <form onSubmit={handleTodoTaskSubmit}>
          <input
            className="todoTaskInput"
            type="text"
            id="todo-task"
            name="todo-task"
            placeholder="Enter the task to be added in todo List"
            value={todoTask}
            onChange={(e) => setTodoTask(e.target.value)}
          ></input>

          <label className="datatimetext" htmlFor="todo-date-time">
            Set a date and time to complete your task:
          </label>
          <input
            className="todoTaskInput"
            type="datetime-local"
            id="todo-date-time"
            name="todo-date-time"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            min={currentDateTime}
          />

          <button className="todoTaskButton">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default Todo;
