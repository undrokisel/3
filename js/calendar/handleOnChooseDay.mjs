import { displayElem } from "../DOM/displayElem.mjs";
import { goHomeBtn } from "../DOM/goHomeBtn.mjs";
import { hideElements } from "../DOM/hideElements.mjs";
import { renderChosenEmloyeeBlock } from "../DOM/workDay/renderChosenEmloyeeBlock.mjs";
import { createBtnChoseTimeFrom } from "./createBtnChoseTime.mjs";
import { hideDatesCalendar, showTimeCalendar } from "./utils.mjs";

// обработка нажатия на дату (выбор дня)
export function handleOnChooseDay (e, calendar, workDayState) {

    hideElements();

    goHomeBtn();

    // прячем даты календаря
    hideDatesCalendar();
    // показываем выбор времени календаря
    showTimeCalendar();

    // также показываем блок с выбранным сотрудником 
    // и кнопкой для его смены
    renderChosenEmloyeeBlock(workDayState.name);


    // отрисовка подсказки что делать дальше
    displayElem({
        id: 'hint', 
        innerText: 'Выберите время начала смены', 
        tag: 'p', 
        parentSelector: '.display',
    })


    // кнопка подрвердить время начала смены
    createBtnChoseTimeFrom(calendar, workDayState);

    

}