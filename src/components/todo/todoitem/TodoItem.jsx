import "./todoitem.css";

function TodoItem({ text }) {
  return (
    <div>
      <div className="todoitemtext">{text}</div>
    </div>
  );
}

export default TodoItem;
