
// Get the current date and time
const currentDate = new Date();
// console.log("current: ", currentDate);

// Format the date as "yyyy-MM-ddThh:mm"
const currentDateTime = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${currentDate
  .getDate()
  .toString()
  .padStart(2, "0")}T${currentDate
  .getHours()
  .toString()
  .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}`;

// console.log("formatted: ", currentDateTime);

export function convertUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert from seconds to milliseconds

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return [ year, month, day, hours, minutes ];
}

export default currentDateTime;

