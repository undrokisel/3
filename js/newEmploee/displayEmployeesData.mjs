import { getStorage } from "../storageHandlers/storageHandlers.mjs";
import { COLORS, NAMES, RATES } from "../utils/constants.mjs";

export const displayEmployeesData = () => {
    const state = createState();
}


export function createState(){

    const names = getStorage(NAMES);
    const colors = getStorage(COLORS);
    const rates = getStorage(RATES);


    if (!names) return false;
    return names.reduce((acc, name) => {

        const color = colors[name];
        const rate = rates[name];
        
        return [
            ...acc,
            {
                'name': name,
                'color': color,                
                'rate': rate,
            }
        ]
    }, [])
}

