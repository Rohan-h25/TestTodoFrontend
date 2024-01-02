import "./timeinput.css";
import getCurrentTime from "../../GetCurrentTime";

function TimeInput({selectedTime, setSelectedTime}){

  const currTime = getCurrentTime();
  
  return (
    <div>
      <label className="timetext" htmlFor="timenput">
            Set a time to complete your task:
      </label>
      <input className="timeinput"
        type="time"
        id="timeInput"
        name="timeInput"
        value={selectedTime}
        min={currTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
    </div>
  );
};

export default TimeInput;

