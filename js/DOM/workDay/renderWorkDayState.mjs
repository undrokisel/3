import { hideDatesCalendar } from "../../calendar/utils.mjs";
import { getHours } from "../../stats/getHours.mjs";
import { getStorage, saveToStorageWorkDay } from "../../storageHandlers/storageHandlers.mjs";
import { btnIds, SUCCESS } from "../../utils/constants.mjs";
import { hideElem, timeStringToMinutes } from "../../utils/utils.mjs";
import { displayElem } from "../displayElem.mjs";
import { goHomeBtn } from "../goHomeBtn.mjs";
import { hideElements } from "../hideElements.mjs";
import { createChooseEmployeeBtn } from "./renderChosenEmloyeeBlock.mjs";

export function renderWorkDayState(workDayState){


    hideElements();
    goHomeBtn();

    hideElem(btnIds.TIME_BLOCK_CLASS);
    hideDatesCalendar();

    // показываем блок сохранения смены
    displayWorkDayStatePrompt(workDayState);


}

function displayWorkDayStatePrompt(workDayState){
    
    const {name, date, timeFrom, timeTo} = workDayState; 

    const rates = getStorage('rates')
    const rate  = rates[name]; 
    
    let hours  = getHours(timeTo, timeFrom);
    
    let dayEarnings = (rate * hours).toFixed(2); 
    
    if (dayEarnings < 0){
        dayEarnings = "Ошибка";
    }


    // блок с информацией
    displayElem({
        id: btnIds.WORK_DAY_STATE,
            innerHTML: `
            <p>Выбран сотрудник: ${name}</p>
            <p>Ставка: ${rate} руб/час</p>
            <p>Дата: ${date}</p>
            <p>Время начала: ${timeFrom}</p>
            <p>Время окончания: ${timeTo}</p>
            <p>Часов в смене: ${hours}</p>
            <p>Оплата за смену: ${dayEarnings} руб.</p>
        `,
    });
            
    // кнопка сохранить
    displayElem({
        tag: 'button',
        id: btnIds.WORK_DAY_STATE_SUBMIT_BTN,
        innerText: `Сохранить`,
        onclick: () => handleOnWorkDayStateSave(workDayState)
    })

    // кнопка сменить работника
    createChooseEmployeeBtn();

}

function handleOnWorkDayStateSave (dataToSave) {
    
    const result = saveToStorageWorkDay(dataToSave);

    if (result === SUCCESS){
        hideElements();
        
        displayElem({
            tag: 'p',
            id: "success-text",
            innerText: 'Данные успешно сохранены'
        });

        goHomeBtn();        

    }

}