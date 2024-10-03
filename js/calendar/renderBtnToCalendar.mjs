import { createBnt } from "../DOM/createBnt.mjs";
import { displayElem } from "../DOM/displayElem.mjs";
import { showElemVisibility } from "../DOM/hideElements.mjs";
import { getHours } from "../stats/getHours.mjs";
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
    let rates;
    let rate;
    let employeeWorkDays;
    if (name){
        dates = getStorage('dates');  
        rates = getStorage('rates');  
        rate = rates[name];

        
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


                HTMLButtonElement.style.flexDirection = 'column';
                HTMLButtonElement.innerHTML = `<span class="calendar-work-day" 
                    data-calendar-day=${date}>${day}
                </span>`;

                if (employeeWorkDays){
                    if (date in employeeWorkDays){
                        // помечаем классом div как содержащий инфу о рабочей смене                        
                        HTMLElement.classList.add("vanilla-calendar-work-day")


                        const hours = getHours(employeeWorkDays[date][1], employeeWorkDays[date][0])
                        const earnings = Math.round(hours * rate);

                        HTMLButtonElement.classList.add('work-day');
                        HTMLButtonElement.innerHTML = `

                            <span class="calendar-work-day_span" 
                                data-calendar-day=${date}>${day}
                            </span>

                            <span class="calendar-work-day_span" 
                                data-calendar-day=${date}>${employeeWorkDays[date][0]}-${employeeWorkDays[date][1]}
                            </span>
                            
                            <span class="calendar-work-day_span" 
                                data-calendar-day=${date}>${hours} ч.: 
                                    <span class="earnings_span">${earnings}</span>
                            </span>
                        `
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

    countEarningsFromCalendar();
};


export function countEarningsFromCalendar(){
    const dayBtns = document.querySelectorAll('.vanilla-calendar-day');

    console.log(dayBtns[0]);

    const weeks = [
        [0,7],
        [7,14],
        [14,21],
        [21,28],
    ];

    const weeksEarningsArr = [];
    
    weeks.forEach(week => {
        countWeekSum(week, dayBtns);
    })
    
    function countWeekSum(week, days){
        let sum = 0;
        for(let index = week[0]; index < week[1]; index++ ){
            const day = days[index];
            const isWorkDay = day.classList.contains("vanilla-calendar-work-day");
            if (!isWorkDay) continue   
            const earningsSpanText = day.querySelector('.earnings_span').innerText;
            sum += +earningsSpanText;
        }
        weeksEarningsArr.push(sum)
    }


    if(weeksEarningsArr.length === 4){
        let msg = ``;
        weeksEarningsArr.forEach((weekEarningsArr, index) => {
            msg += `<p>Неделя ${index + 1}: ${weekEarningsArr} руб.</p>`
        })
        displayElem({
            id: 'week-earnings-block',
            className: 'week-earnings-block',
            innerHTML: `${msg}`,
            parentSelector: 'body'
        })
    }

}

