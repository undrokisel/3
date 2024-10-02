export function createBnt({
    text = '', 
    onclick = null,
    className="",
    id="",
}){
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = onclick;
    btn.className = className;
    btn.id = id;
    return btn;
}