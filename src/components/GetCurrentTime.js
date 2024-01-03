// Get the current date and time

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const newhr = hours < 10 ? `0${hours}` : hours;
  const newmin = minutes < 10 ? `0${minutes}` : minutes;

  // Create the formatted time string
  const currentTime = `${newhr}:${newmin}`;

  return currentTime;
}

export default getCurrentTime;

export function changetimeformate(time) {
  const hr = Math.floor(time / 60);
  const min = time % 60;

  //Changing hr min to am/pm format
  const ampm = hr >= 12 ? "PM" : "AM";

  let newhr = hr % 12 === 0 ? 12 : hr % 12;
  newhr = newhr < 10 ? `0${newhr}` : newhr;
  const newmin = min < 10 ? `0${min}` : min;

  return [newhr, newmin, ampm];
}
