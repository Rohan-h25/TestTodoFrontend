// import {convertUnixTimestamp} from "../GetDateAndTime";

import ClockIcon from "./ClockIcon";

function TodoItem({text, time}) {

    // const [ year, month, day, hours, minutes ] = convertUnixTimestamp(time);

    // const normalFormate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return (
        <div>
            <div>• {text}</div>
            <ClockIcon time = {time} />
            {/* <div>complete on: {normalFormate}</div> */}
        </div>
    );
}

export default TodoItem;