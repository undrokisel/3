import { COLORS, NAMES, RATES, SUCCESS } from "../utils/constants.mjs";
import { timeStringToMinutes } from "../utils/utils.mjs";

export function getStorage(key){
    let value = window.localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
}

export function saveToStorage (key, data) {
    // получаем запись из локал сторадж
    let storage = getStorage(key);

    // если заходят впервые - создаем пустой массив для сохранения имени
    if ((key===NAMES) && (!Array.isArray(storage)|| storage.length === 0 || storage[0] === null)){
        storage = [];
    }

    // или объект для сохранения рейта или цвета
    if (!storage){
        storage = {};
    }

    // если имя ранее уже было в списке
    const isRepeated = (key===NAMES) && (storage.includes(data));
    if (isRepeated){
        alert(`Имя ${data} уже ранее было сохранено ранее`);
    // если передано не пустое значение
    } else if (data !== "") {
        // сохраняем 
        if ([RATES, COLORS].includes(key)) {
            let name = data[0];
            let value = data[1];
            storage[name] = value;
        } else if (key===NAMES) {
            storage = [...storage, data];
        }
        window.localStorage.setItem(key, JSON.stringify(storage));
        return SUCCESS;
    }
}

export function saveToStorageWorkDay(dataToSave){
    const {name, date, timeFrom, timeTo} = dataToSave;

    const key = 'dates'
    // получаем запись из локал сторадж
    let storage = getStorage(key);

    const minutesFrom = timeStringToMinutes(timeFrom)
    const minutesTo = timeStringToMinutes(timeTo)


    if (minutesFrom >= minutesTo) return false;

    // если заходят впервые - создаем пустой объект
    if(!storage){
        storage = {};
        storage[name] = {};
    } 
    // если хранилище есть, но только для других сотрудников
    if (storage && !storage[name]){
        storage[name] = {};
    }

    // при любом раскладе сохраняем дату в объект
    storage[name][date] = [timeFrom, timeTo];

    window.localStorage.setItem(key, JSON.stringify(storage));
    return SUCCESS;
    
}
