export function timeAgo(timestamp) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp);

  const timeDifference = currentDate - commentDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return `${seconds}s ago`;
  }
}

// const timestamp = "2024-01-13T23:48:19.001Z";
// console.log(timeAgo(timestamp))
// const formattedTime = timeAgo(new Date(timestamp));
// console.log(formattedTime);
