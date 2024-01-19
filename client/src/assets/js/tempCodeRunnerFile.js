function timeAgo(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);

  const timeDifference = currentDate - commentDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

const timestamp = "2024-01-13T23:48:19.001Z";
console.log(timeAgo(timestamp))
// const formattedTime = timeAgo(new Date(timestamp));
// console.log(formattedTime);
