import { getHours } from "./getHours.mjs";

export function countHoursMonth(datesEmloyee, monthShift = 0){
    // datesEmloyee - объект с ключами - датами YYYY-MM-DD

    console.log("monthShift", monthShift);

    const now = new Date();
    // текущий год и месяц: 
    const currYear = +now.getFullYear();
    const nowMonth = +now.getMonth() + 1;

    let currMonth = (nowMonth > monthShift) 
        ? (nowMonth - monthShift)
        : 12 + nowMonth - monthShift;


    console.log("currMonth", typeof currMonth, currMonth);

    
    // получаем массив дат и часов по текущему месяцу
    const currMonthDates = Object.entries(datesEmloyee).filter(entrie => {
        const date = entrie[0];
        // получаем год и месяц при переборе сохраненных смен
        const year = +date.slice(0,4);
        const month = +date.slice(5,7);    
        // оставляем только соответствующие текущему месяцу и году
        return (year === currYear) && (month === currMonth)
    })

    const hoursInMonth = currMonthDates.reduce((sum, FromToArr) => {
        let hours  = getHours(FromToArr[1][1], FromToArr[1][0]);
        sum +=hours;
        return sum
    }, 0)

    return hoursInMonth;
}