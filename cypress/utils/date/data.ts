import moment from "moment";

export function getDateInDateAndTimeFormat(date: string) {
  return moment(date).format("YYYY/MM/DD HH:mm:ss");
}
