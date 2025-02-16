// function to make time_stamp more readable,
// if timestamp is less than 24hrs show hours instead of date,
// if timestamp less than 48hrs show yesterday,
// if less than a week show day of the week,
// else show date in format 24 may, only add year if it is not the current year

const getReadableTimeStamp = (time_stamp: string) => {
  const date = new Date(time_stamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInHours = diff / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (diffInHours < 48) {
    return "Yesterday";
  } else if (diffInHours < 168) {
    return date.toLocaleString("en-us", { weekday: "long" });
  } else {
    return date.toLocaleString("en-us", {
      day: "numeric",
      month: "short",
      year: now.getFullYear() === date.getFullYear() ? undefined : "numeric",
    });
  }
};

export default getReadableTimeStamp;
