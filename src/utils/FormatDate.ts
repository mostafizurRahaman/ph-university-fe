import { months } from "../constants/global";

const formatDate = (date: string | Date) => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDay() + 1;

  return `${day.toString().padStart(2, "0")} ${months[month]
    ?.toUpperCase()
    .slice(0, 3)} ${year}`;
};

export default formatDate;
