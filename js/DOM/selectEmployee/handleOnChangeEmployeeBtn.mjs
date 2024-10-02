import { renderChoseEmlployee } from "../../calendar/checkInWorkDay.mjs";
import { hideDatesCalendar } from "../../calendar/utils.mjs";
import { btnIds } from "../../utils/constants.mjs";
import { hideElem } from "../../utils/utils.mjs";
import { hideElements } from "../hideElements.mjs";

export function handleOnChangeEmployeeBtn() {


    hideElements();
    hideElem(btnIds.TIME_BLOCK_CLASS)
    hideDatesCalendar();

    renderChoseEmlployee();
}