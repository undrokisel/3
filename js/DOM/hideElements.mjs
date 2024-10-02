export function hideElements (){

    const elems = document.querySelectorAll('.display > *')
    elems.forEach(btn => btn.remove());

    const elemsInBody = document.querySelectorAll('body > *:not(.display):not(#calendar)')
    elemsInBody.forEach(item => item.remove());
    
    
}


export function hideElemVisibility(selector){
    const elem = document.querySelector(selector)
    if (elem){
        elem.style.visibility = "hidden";
    }
};

export function showElemVisibility(selector){
    const elem = document.querySelector(selector)
    if (elem){
        elem.style.visibility = "visible";
    }
}


