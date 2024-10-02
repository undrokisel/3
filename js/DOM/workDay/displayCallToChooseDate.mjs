import { btnIds } from "../../utils/constants.mjs";
import { displayElem } from "../displayElem.mjs";

// отрисовка призыва выбрать дату
export function displayCallToChooseDate(){
    displayElem({
        tag: 'p',
        id: btnIds.CALL_TO_DATE,
        innerText: `Выберите дату из календаря`,
    })
}
