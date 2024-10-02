import { hideElem, showElem } from "../utils/utils.mjs"

export function hideDatesCalendar(){
    // прячем заголовок календаря (месяц, год)
    hideElem('.vanilla-calendar-header')
    // прячем даты календаря
    hideElem('.vanilla-calendar-wrapper')        
}

export function showDatesCalendar(){
    //  заголовок календаря (месяц, год)
    showElem('.vanilla-calendar-header', 'flex')
    //  даты календаря
    showElem('.vanilla-calendar-wrapper', 'flex')        
}


export function hideTimeCalendar(){
    hideElem('.vanilla-calendar-time')        
};

export function showTimeCalendar(){
    showElem('.vanilla-calendar-time', 'flex')        

};
