import { renderCalendar } from "../../calendar/renderBtnToCalendar.mjs";
import { getStorage } from "../../storageHandlers/storageHandlers.mjs";
import { btnIds } from "../../utils/constants.mjs";
import { goHomeBtn } from "../goHomeBtn.mjs";
import { hideElements } from "../hideElements.mjs";
import { displayCallToChooseDate } from "../workDay/displayCallToChooseDate.mjs";
import { renderChosenEmloyeeBlock } from "../workDay/renderChosenEmloyeeBlock.mjs";

export function renderSelectEmployee() {
    const items = getStorage('names');

    const select = document.createElement('select');
    select.id = btnIds.CHOOSE_EMPLOYEE_SELECT;

    // Добавляем пустую опцию в начало списка
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.innerText = ''; // Пустое значение для отображения
    select.appendChild(emptyOption);

    items.forEach(item => {
        const option = document.createElement('option')
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
        select.onchange = handleSelectOnChangeEmploee;
    })
    
    const display = document.querySelector('.display'); 
    display.appendChild(select);
}


// обработчик выбора селекта
export function handleSelectOnChangeEmploee (e, workDayState = {}){

    hideElements();
    goHomeBtn();


    const chosenEmployee = e.target.value;
    workDayState.name = chosenEmployee;
    

    // отрисовка блока с выбранным сотрудником
    // и кнопкой смены сотрудника
    renderChosenEmloyeeBlock(chosenEmployee);
    


    // отрисовка призыва выбрать дату
    displayCallToChooseDate();
        
    renderCalendar(workDayState);

}
