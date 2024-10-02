import { createBnt } from "../DOM/createBnt.mjs";
import { createInput } from "../DOM/createInput.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { getInputValue } from "../DOM/getInputValue.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";
import { hideElements } from "../DOM/hideElements.mjs";
import { resetInputsValues } from "../DOM/resetInputsValues.mjs";
import { btnIds } from "../utils/constants.mjs";
import { addEmployeeProcessStepColor } from "./addEmployeeProcessStepColor.mjs";

export function addEmployeeProcessStepRate (nameEmployee){
 
    
    //спрятать все кнопки и инпуты
    hideElements();
    
    goHomeBtn();
    
    displayElem({
        id: 'hint',
        innerText: 'Оплата за час'
    })
    
    // получить елемент для вставки узлов
    const display = document.querySelector('.display'); 
    
    // создать инпут для ввода rate
    const input = createInput({
        placeholder: 100,
        type: "number",
        className: 'add-employee-input__rate',
        id: btnIds.ADD_EMPLOYEE_RATE_BTN 
    });
    input.step = 5;
    input.max = 4000;
    input.min = 40;
    display.appendChild(input);
    
    //создать кнопку для подтверждения ввода рейта
    const btn = createBnt({
        text: "Сохранить", 
        onclick: () => handleOnAddRateEmployee(nameEmployee)
    });
    display.appendChild(btn);
}


export function handleOnAddRateEmployee (nameEmployee) {
    const rateValue = getInputValue(btnIds.ADD_EMPLOYEE_RATE_BTN);

    if (rateValue){    
            resetInputsValues();
            addEmployeeProcessStepColor([nameEmployee , rateValue]);
    }
};
