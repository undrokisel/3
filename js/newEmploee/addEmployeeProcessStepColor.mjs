import { createBnt } from "../DOM/createBnt.mjs";
import { createInput } from "../DOM/createInput.mjs";
import { getInputValue } from "../DOM/getInputValue.mjs";
import { hideElements } from "../DOM/hideElements.mjs";
import { resetInputsValues } from "../DOM/resetInputsValues.mjs";
import { saveToStorage } from "../storageHandlers/storageHandlers.mjs";
import { btnIds, COLORS, NAMES, RATES, SUCCESS } from "../utils/constants.mjs";
import { startPage } from "../script.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";

export function addEmployeeProcessStepColor (data){
 
    
    //спрятать все кнопки и инпуты
    hideElements()

    goHomeBtn();
    
    displayElem({
        id: 'hint',
        innerText: 'Выберите цвет сотрудника'
    })


    // получить елемент для вставки узлов
    const display = document.querySelector('.display'); 

    
    // создать инпут для ввода color;
    const input = createInput({
        type: "color",
        className: 'add-employee-input__color',
        id: btnIds.ADD_EMPLOYEE_COLOR_BTN 
    });
    display.appendChild(input);
    
    //создать кнопку для подтверждения ввода рейта
    const btn = createBnt({
        text: "Сохранить", 
        onclick: () => handleOnAddColorEmployee(data)
    });
    display.appendChild(btn);
}


export function handleOnAddColorEmployee ([nameEmployee, rateEmployee]) {
    const color = getInputValue(btnIds.ADD_EMPLOYEE_COLOR_BTN);
    
    const resultSavedName = saveToStorage(NAMES, nameEmployee);
    const resultSavedRate = saveToStorage(RATES, [nameEmployee, rateEmployee]);
    const resultSavedColor = saveToStorage(COLORS, [nameEmployee, color]);

    if ( resultSavedName === SUCCESS && resultSavedRate === SUCCESS && resultSavedColor === SUCCESS){
        resetInputsValues();
        startPage();
    }

};
