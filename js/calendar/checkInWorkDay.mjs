import { createBnt } from "../DOM/createBnt.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";
import { hideElements } from "../DOM/hideElements.mjs";
import { renderSelectEmployee } from "../DOM/selectEmployee/renderSelectEmployee.mjs";
import { btnIds, CHECK_IN_WORK_DAY_MSG } from "../utils/constants.mjs";

export function checkInWorkDayBtn (){
    const btn =  createBnt({
        className: '',
        id: btnIds.CHECK_IN_WORK_DAY_PROCESS_BTN,
        onclick: handleOnCheckInWorkDayProcess,
        text: CHECK_IN_WORK_DAY_MSG,
    })
    const display = document.querySelector('.display')
    display.appendChild(btn);
}


// обработчик нажатия на кнопку "Заполнить смену"
export function handleOnCheckInWorkDayProcess () {
    renderChoseEmlployee();
}


// отрисовка выбора сотрудника
export function renderChoseEmlployee(){
    hideElements();

    goHomeBtn();

    displayElem({
        id:'hint', 
        innerText : 'Выберите сотрудника', 
    })

    renderSelectEmployee();
}





