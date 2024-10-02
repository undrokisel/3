import { addEmployeeProcessStepName } from '../newEmploee/addEmployeeProcessStepName.mjs';
import { btnIds } from '../utils/constants.mjs';
import {} from '../storageHandlers/storageHandlers.mjs';
import {} from '../utils/constants.mjs';




export const handleClick = (e) => {
    const btnId = e.target.id;
    if (btnId.match(btnIds.ADD_EMPLOYEE_PROCESS_BTN)){
        addEmployeeProcessStepName ();
    }

    document.removeEventListener('click', handleClick);
    
}

document.addEventListener('click', handleClick, {once: true});


