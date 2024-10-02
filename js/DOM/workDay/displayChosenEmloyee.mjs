import { btnIds } from "../../utils/constants.mjs";
import { displayElem } from "../displayElem.mjs";

// отрисовка выбранного персонажа
export function displayChosenEmloyee(choosedEmployee) {
    displayElem({
        tag: 'p',
        id: btnIds.CHOOSEN_EMPLOYEE_TITLE,
        innerText: `Выбран сотрудник: ${choosedEmployee}`,
    })
}