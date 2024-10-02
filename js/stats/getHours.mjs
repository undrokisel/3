import { timeStringToMinutes } from "../utils/utils.mjs";

export function getHours(timeTo, timeFrom){
    console.log(timeTo, timeFrom);
    return +((+timeStringToMinutes(timeTo) - +timeStringToMinutes(timeFrom))/60).toFixed(2);
}