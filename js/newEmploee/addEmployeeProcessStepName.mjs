import { createBnt } from "../DOM/createBnt.mjs";
import { createInput } from "../DOM/createInput.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { getInputValue } from "../DOM/getInputValue.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";
import { hideElements } from "../DOM/hideElements.mjs";
import { resetInputsValues } from "../DOM/resetInputsValues.mjs";
import { btnIds } from "../utils/constants.mjs";
import { addEmployeeProcessStepRate } from "./addEmployeeProcessStepRate.mjs";

export function addEmployeeProcessStepName(){

    //спрятать все кнопки
    hideElements();

    goHomeBtn();

    displayElem({
        id: "hint",
        innerText: "Введите имя нового сотрудника"
    })

    // получить елемент для вставки узлов
    const display = document.querySelector('.display'); 

    // создать инпут для ввода имени
    const input = createInput({
        placeholder:'Введите имя', 
        className: 'add-employee-input__name',
        id: btnIds.ADD_EMPLOYEE_NAME_BTN 
    });
    display.appendChild(input);
    
    //создать кнопку для подтверждения ввода имени
    const btn = createBnt({
        text: "Сохранить", 
        onclick: handleOnAddNameEmployee
    });
    display.appendChild(btn);

}


export function handleOnAddNameEmployee() {
    const name = getInputValue(btnIds.ADD_EMPLOYEE_NAME_BTN);
    
    if (name) {
        addEmployeeProcessStepRate(name);
        resetInputsValues();
    }
    
};
