import { checkInWorkDayBtn } from "./calendar/checkInWorkDay.mjs";
import { createBnt } from "./DOM/createBnt.mjs";
import { displayElem } from "./DOM/displayElem.mjs";
import { hideElements, hideElemVisibility } from "./DOM/hideElements.mjs";
import { handleClick } from "./listeners/listeners.mjs";
import { createState } from "./newEmploee/displayEmployeesData.mjs";
import { handleOnShowStats } from "./stats/handleOnShowStats.mjs";
import { getStorage } from "./storageHandlers/storageHandlers.mjs";
import { ADD_EMPLOYEE_MSG, btnIds, NAMES, rus } from "./utils/constants.mjs";

export const startPage = () => {
    
    // прячем все лишнее при повторном использовании
    hideElements();
    hideElemVisibility("#calendar");

    const names = getStorage(NAMES);
    if (names){
        // кнопка статистика
        displayElem({
            id: 'show-stats-btn',
            tag: "button",
            innerText: "Статистика",
            onclick: handleOnShowStats
        })
    }

    // забираем что есть из стораджа, пусть это будет псевдостор
    const state = createState();

    // также отрисовываем элементы для добавления 
    // новго сотрудника в любом случае
    renderElemsToAddEmployee();

    if (state) {
        // если что-то есть в сторе, то отрисовываем
        // renderState(state);
        // а также кнопку для отметки рабочей смены;
        checkInWorkDayBtn();
    }

    
};

startPage();


export function renderElemsToAddEmployee () {
    const display = document.getElementsByClassName('display')[0];
    const btn = createBnt({
        text: ADD_EMPLOYEE_MSG, 
        id: btnIds.ADD_EMPLOYEE_PROCESS_BTN,
        onclick: handleClick
    });
    display.appendChild(btn);

    const script = document.createElement("script");
    script.type = "module";
    script.src = '/js/listeners/listeners.mjs';

    document.body.append(script)
} 


export function renderState (state)  {
    const display = document.querySelector('.display')
    
    const title = document.createElement('h4')
    title.innerText = `Количество работников: ${state.length}`
    display.appendChild(title);
    
    const employeesList = document.createElement('div')
    employeesList.classList.add('employees-list');
    display.appendChild(employeesList)

    state.forEach(employee => {
        
        const employeeCard = document.createElement('div')
        employeeCard.classList.add('employee-card');
        employeesList.appendChild(employeeCard)

        for(let key in employee){
            const item = document.createElement('div')
            item.innerHTML = `<div>${rus[key]}: ${employee[key]}</div>`;
            item.style = "display:flex;justify-content:center;align-items:center; gap:10px";

            if (key === 'color'){
                item.innerText = `${rus[key]}:`;
            }

            employeeCard.appendChild(item);
            
            if (key === "color"){
                const block = document.createElement('p')
                block.style = `background:${employee[key]}; min-height: 20px; width: 20px;`
                item.appendChild(block);
            }

        }
    })
}
