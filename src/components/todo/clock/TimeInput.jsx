import "./timeinput.css";

function TimeInput({selectedTime, setSelectedTime}){
  
  return (
    <div>
      <label className="timetext" htmlFor="todo-time">
            Set a time to complete your task:
      </label>
      <input className="timeinput"
        type="time"
        id="timeInput"
        name="timeInput"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
    </div>
  );
};

export default TimeInput;

