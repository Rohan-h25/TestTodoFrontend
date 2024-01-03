import {changetimeformate} from "../../GetCurrentTime";
import "./showtime.css";

function ShowTime({time}) {

    const [hr, min, ampm] = changetimeformate(time);

    return (
        <div>
            <p className="showtimetext">Time to complete:</p>
            <p className="showtime">{hr}:{min} {ampm}</p>
        </div>
    );
}

export default ShowTime;