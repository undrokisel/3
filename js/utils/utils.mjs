export function clearElems(selector){
    const elemsToClear = document.querySelectorAll(selector)
    elemsToClear.forEach(elem => elem.remove());
}


export function hideElem(selector){
    const elem = document.querySelector(selector);
    elem.style.display = "none"; 
}

export function showElem(selector, displayType = "block"){
    const elem = document.querySelector(selector);
    elem.style.display = displayType; 
}

export function timeStringToMinutes(timeStr){
    const arr = timeStr.split(":");
    return +arr[0]*60 + +arr[1]
}