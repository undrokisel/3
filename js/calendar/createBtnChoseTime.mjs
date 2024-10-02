import { createBnt } from "../DOM/createBnt.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { renderWorkDayState } from "../DOM/workDay/renderWorkDayState.mjs";
import { btnIds } from "../utils/constants.mjs";
import { hideElem } from "../utils/utils.mjs";

// кнопка подрвердить время начала смены
export function createBtnChoseTimeFrom(calendar, workDayState){
    const btn = createBnt({
        text: "Подтвердить", 
        id: btnIds.CHOOSE_TIME_FROM_BTN,
        onclick: () => handleOnChooseTimeFrom(calendar, workDayState)
    });
    document.body.appendChild(btn);
}



// кнопка подрвердить время конца смены
export function createBtnChoseTimeTo(calendar, workDayState){
    const btn = createBnt({
        text: "Подтвердить", 
        id: btnIds.CHOOSE_TIME_TO_BTN,
        onclick: () => handleOnChooseTimeTo(calendar, workDayState)
    });
    document.body.appendChild(btn);
}


export function handleOnChooseTimeFrom(calendar, workDayState){

    // прячем старую кнопку
    hideElem(`#${btnIds.CHOOSE_TIME_FROM_BTN}`);
    
    // получаем время старта
    const timeFrom = calendar.selectedTime;  
    
    workDayState = {
        ...workDayState,
        timeFrom
    } 
     // прячем старую подсказку
    hideElem(`#hint`);
    
    // показываем новую подсказку
    // отрисовка подсказки что делать дальше
    displayElem({
        id: 'hint', 
        innerText: 'Выберите время окончания смены', 
        tag: 'div', 
        parentSelector: '.display',
    })


    // создаем новую кнопку для получения времени окончания
    createBtnChoseTimeTo(calendar, workDayState);


}

export function handleOnChooseTimeTo(calendar, workDayState){
    const timeTo = calendar.selectedTime;        
    workDayState = {...workDayState, timeTo}
    
    // отрисовка результа всех предыдущих выборов
    renderWorkDayState(workDayState);
}
