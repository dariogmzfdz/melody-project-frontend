import convertDuration from "./ConvertDuration";

function convertDurationPlaylist(duration) {
  const totalDuration = duration.reduce((acc, curr) => acc + curr, 0);
  let hours = Math.floor(totalDuration / 3600);
  let minutes = Math.floor((totalDuration - hours * 3600) / 60);

  if (hours.toString().length > 1) {
    return `${minutes} min`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
}

export default convertDurationPlaylist;
