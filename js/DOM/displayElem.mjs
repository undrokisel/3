import {clearElems} from "../utils/utils.mjs"


export function displayElem({
    id = '', 
    innerText = '', 
    innerHTML = '', 
    tag = 'div', 
    parentSelector = '.display',
    onclick = () => {},
    className="",
}){
    clearElems(`#${id}`);

    const elem = document.createElement(tag);
    elem.innerText = innerText;
    if(innerHTML){
        elem.innerHTML = innerHTML;
    }
    elem.id = id;
    elem.onclick = onclick;
    if (className){
        elem.classList.add(className);
    }
    const parent = document.querySelector(parentSelector)
    parent.append(elem);
}