export function resetInputsValues(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = null);
}
