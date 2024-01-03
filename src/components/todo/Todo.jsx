import "./todo.css";
import { DisplayTodo } from "./DisplayTodo";
import TimeInput from "./TimeInput/TimeInput";
import { useState, useEffect } from "react";
import axios from "axios";
import getCurrentTime from "../GetCurrentTime";

function Todo() {
  const [todoTask, setTodoTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEmptyTask, setIsEmptyTask] = useState(false);
  const [isEmptyTodo, setIsEmptyTodo] = useState(true);
  const [buttonText, setButtonText] = useState("Add Task");
  const [selectedTime, setSelectedTime] = useState(getCurrentTime());

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
    getTodos();
  }, []);

  async function handleTodoTaskSubmit(ev) {
    ev.preventDefault();

    setButtonText("Add Task");

    if (todoTask === "") {
      setIsEmptyTask(true);
    } else {

      //making todo using id and todoTask and time.

      // Split the time string into hours and minutes
      const [newHours, newMinutes] = selectedTime.split(":");
      const convertedtime =
        parseInt(newHours, 10) * 60 + parseInt(newMinutes, 10);

      const todo = {
        id: generateRandomNumber(),
        value: todoTask,
        time: convertedtime,
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
      <button className="todoListButton">Todo List</button>
        {isEmptyTask && (
          <div className="todoError">Error! Empty task cannot be added.</div>
        )}
        {isEmptyTodo && (
          <div className="todoEmpty">Empty List</div>
        )}
        <DisplayTodo
          todos={todos}
          setTodoTask={setTodoTask}
          setSelectedTime={setSelectedTime}
          setButtonText={setButtonText}
          setIsEmptyTask={setIsEmptyTask}
          getTodos={getTodos}
          setIsEmptyTodo = {setIsEmptyTodo}
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

          <TimeInput selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          <button className="todoTaskButton">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default Todo;
