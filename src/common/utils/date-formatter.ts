const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const formatDate = (date: Date) => {
  const month = months[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();

  return month + " " + day + ", " + year;
};
