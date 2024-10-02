import { btnIds } from "../../utils/constants.mjs";
import { displayElem } from "../displayElem.mjs";
import { handleOnChangeEmployeeBtn } from "../selectEmployee/handleOnChangeEmployeeBtn.mjs";
import { displayChosenEmloyee } from "./displayChosenEmloyee.mjs";

export function renderChosenEmloyeeBlock(chosenEmployee){


    // отрисовка кнопки "Сменить сотрудника"
    createChooseEmployeeBtn();

    // отрисовка имени выбранного персонажа
    displayChosenEmloyee(chosenEmployee);


}


export function createChooseEmployeeBtn(){
    displayElem({
        id: btnIds.CHANGE_EMPLOYEE_BTN, 
        innerText : 'Сменить сотрудника', 
        tag : 'button', 
        parentSelector : '.display',
        onclick: handleOnChangeEmployeeBtn,
    })
}