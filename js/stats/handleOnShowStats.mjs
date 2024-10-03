import { renderChoseEmlployee } from "../calendar/checkInWorkDay.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";
import { hideElements, hideElemVisibility } from "../DOM/hideElements.mjs";
import { getStorage } from "../storageHandlers/storageHandlers.mjs";
import { DATES, months, NAMES, RATES } from "../utils/constants.mjs";
import { countHoursMonth } from "./countHoursMonth.mjs";

export function handleOnShowStats() {
    hideElements();
    hideElemVisibility("#calendar");

    goHomeBtn();

    const employees = getStorage(NAMES);
    const rates = getStorage(RATES);
    const dates = getStorage(DATES);
    

    const str = employees.reduce((acc, employee) => {
        
        const rate = rates[employee];
        const datesEmployee = dates[employee];
        
        // статистика за текущий месяц
        const hoursCurrMonth = countHoursMonth(datesEmployee);
        const earningsCurrMonth = Math.round(hoursCurrMonth * rate); 
        
        // статистика за прошлый месяц
        const hoursMonthBefore = countHoursMonth(datesEmployee, 1);

        const earningsMonthBefore = Math.round(hoursMonthBefore * rate); 
        
        // статистика за позапрошлый месяц
        const hoursMonthAfterBefore = countHoursMonth(datesEmployee, 2);
        const earningsMonthAfterBefore = Math.round(hoursMonthAfterBefore * rate); 


        const currMonth = +(new Date().getMonth())
        const monthToShow = months[currMonth + 1];
        const monthBefore = months[ (currMonth > 0) ? (currMonth - 1 + 1): 12];
        const monthBeforeBefore = months[(currMonth > 1) ? (currMonth - 1): (12 + currMonth -2 + 1)];
        
        acc += `<span>${employee}: ${rate} руб/час</span><br/><br/>`

        acc += `<span>${monthToShow}.: за ${hoursCurrMonth} ч. ${earningsCurrMonth} руб.</span><br/>`
        acc += `<span>${monthBefore}.: за ${hoursMonthBefore} ч. ${earningsMonthBefore} руб.</span><br/>`
        acc += `<span>${monthBeforeBefore}.: за ${hoursMonthAfterBefore} ч. ${earningsMonthAfterBefore} руб.</span><br/><br/><br/>`
        return acc
    }, ``);



    displayElem({
        id: "stats-header",
        tag: "p",
        innerHTML: `
            <h5>Статистика</h5>
            ${str}
        `
    })


    // displayElem({
    //     id: "stats-save-btn",
    //     tag: "button",
    //     innerHTML: `Cохранить статистику в файл`,
    //     onclick: () => onSaveStatsHandle(str)
    // })
    
}

function onSaveStatsHandle(text){


    const cleanedText = cleanText(text);

    // Создание нового Blob с очищенным текстом
    const blob = new Blob([cleanedText], {type: 'text/plain'});

    // Создаем ссылку для скачивания файла
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'stats.txt';
    link.click();

    goHomeBtn();

    function cleanText(text) {
        // Удаление HTML-тегов и замена <br> на перенос строки
        let cleanedText = text.replace(/<br\/>/g, '\r\n');
        return cleanedText
    }

}