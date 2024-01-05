import TodoItem from "./todoitem/TodoItem";
import "./todo.css";
import axios from "axios";
import ShowTime from "./clock/ShowTime";
import TodoList from "./Icons/TodoListIcon";

export function DisplayTodo({
  todos,
  setTodoTask,
  setSelectedTime,
  setButtonText,
  setIsEmptyTask,
  getTodos,
  setIsEmptyTodo,
}) {
  function editButtonGotClicked(id, value, time) {
    deleteButtonGotClicked(id);
    setTodoTask(value);
    setButtonText("Update Task");

    const hr = Math.floor(time / 60);
    const min = time % 60;

    const newhr = hr < 10 ? `0${hr}` : hr;
    const newmin = min < 10 ? `0${min}` : min;

    const newTime = `${newhr}:${newmin}`;
    setSelectedTime(newTime);
  }

  async function deleteButtonGotClicked(id) {
    //when isEmptyTask is true and then we click the delete button.
    setIsEmptyTask(false);

    //delete todo from db
    const deleted = await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/todo/delete`,
        { id },
        { withCredentials: true }
      )
      .catch((err) => {
        console.log(err);
      });

    // console.log(deleted.status);
    if (deleted.status === 200) {
      getTodos();
    }
  }

  return (
    <div>
      {todos.length === 0 ? setIsEmptyTodo(true) : setIsEmptyTodo(false)}
      {todos.map((item) => (
        <div className="todoItem" key={item.id}>
          <div className="todoItemIcontimetext">
            <TodoList />
            <div className="todoItemtextcontainer">
              <TodoItem text={item.value} />
            </div>
          </div>
          <ShowTime time={item.time} />
          <div className="todocontainerIcon">
            {/* <div className="clockIcon">
              <ClockIcon time={item.time} />
            </div> */}
            <button
              className="todoIcon"
              onClick={() =>
                editButtonGotClicked(item.id, item.value, item.time)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              className="todoIcon"
              onClick={() => deleteButtonGotClicked(item.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
