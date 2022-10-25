function convertDuration(duration) {
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration - minutes * 60);
  if (seconds.toString().length === 1) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

export default convertDuration;
