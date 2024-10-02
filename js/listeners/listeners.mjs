import { addEmployeeProcessStepName } from '../newEmploee/addEmployeeProcessStepName.mjs';
import { btnIds } from '../utils/constants.mjs';
import {} from 'js/storageHandlers/storageHandlers.mjs';
import {} from 'js/utils/constants.mjs';




export const handleClick = (e) => {
    const btnId = e.target.id;
    if (btnId.match(btnIds.ADD_EMPLOYEE_PROCESS_BTN)){
        addEmployeeProcessStepName ();
    }

    document.removeEventListener('click', handleClick);
    
}

document.addEventListener('click', handleClick, {once: true});


