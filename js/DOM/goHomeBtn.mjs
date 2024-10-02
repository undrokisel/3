import { startPage } from "../script.mjs";
import { displayElem } from "./displayElem.mjs";


export function goHomeBtn (){
    displayElem({
    tag: "button",
    id: "get-home-btn",
    innerText: 'Вернуться на главную',
    onclick: startPage,
    className: "mb-30",
});
}  