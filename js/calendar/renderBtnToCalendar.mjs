import { createBnt } from "../DOM/createBnt.mjs";
import { showElemVisibility } from "../DOM/hideElements.mjs";
import { getStorage } from "../storageHandlers/storageHandlers.mjs";
import { btnIds, LINK_CALENDAR_MSG } from "../utils/constants.mjs";
import { hideElem } from "../utils/utils.mjs";
import { handleOnChooseDay } from "./handleOnChooseDay.mjs";

export function renderBtnToCalendar(){
    const btn =  createBnt({
        className: '',
        id: btnIds.LINK_TO_CALENDAR_BTN,
        onclick: handleOnLinkCalendar,
        text: LINK_CALENDAR_MSG,
    })
    const display = document.querySelector('.display')
    display.appendChild(btn);
}

export function handleOnLinkCalendar() {
    renderCalendar()
}

export function renderCalendar(workDayState){

    showElemVisibility("#calendar");

    const name = workDayState['name'];
    let dates;
    let employeeWorkDays;
    if (name){
        dates = getStorage('dates');  
        if(dates){
            employeeWorkDays = dates[name];
        } else {
            employeeWorkDays = [];
        }     
    } else {
        employeeWorkDays = [];
    }

    const calendar = new VanillaCalendar('#calendar', {
        timePicker: true, // Добавьте эту опцию
        timePickerMode: '24h', // 
        date: {
            min: '2024-09-01',    
            max: '2030-12-31',
        },    
        actions: {
            clickDay(e, calendar) { // клик по дате
                const date = e.target.dataset.calendarDay;
                workDayState = {...workDayState, date} 
                handleOnChooseDay(e, calendar, workDayState)
            },
            changeTime(e, self) {}, // изменение времени
            getDays(day, date, HTMLElement, HTMLButtonElement, self) {
                if (employeeWorkDays){
                    if (date in employeeWorkDays){
                            HTMLButtonElement.classList.add('work-day');
                    }
                }
            },
        },
    });

    const settings = calendar.settings
    settings.lang = 'ru-Ru';
    settings.timePicker = true; 

    settings.selected = {
        dates: [new Date()],
    }

    settings.selection.time= 24;
    settings.selection.stepMinutes = 10;
    settings.selection.controlTime = 'all';    
    
    settings.visibility.theme = 'dark'
    calendar.init();


    // Первоначально спрячем выбор времени    
    hideElem(btnIds.TIME_BLOCK_CLASS)
};


