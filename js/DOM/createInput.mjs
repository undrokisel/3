export function createInput({
    placeholder = '', 
    className = '', 
    type ="text", 
    id = ''
}){
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.className = className; 
    input.id = id; 
    return input;
}