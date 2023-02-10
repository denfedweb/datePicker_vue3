import {defineStore} from 'pinia'

export const useDatesStore = defineStore('DatesStore', {
  state: () => {
    return {
      timeHidden: false,
      sidebarShowed: false,
      currentDate: new Date().setHours(0,0,0,0),
      toDate: null,
      currentMonth: new Date(),
      nextMonth: null,
      month: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      currentDaysInMonth: [],
      nextDaysInMonth: [],
      selectedDays: [],
    }
  },
  getters: {
    currentDateMonth(state) {
      return new Date(state.currentMonth).getMonth()
    },
    currentDateWeek(state){
      return new Date(state.currentDate).getWeek()
    }
  },
  actions: {
    setCurrentDays(){
      let dateArray = new Array()
      let currentDate = new Date(this.currentDate)
      while (currentDate < new Date(this.toDate)) {
        dateArray.push(currentDate.getTime())
        currentDate = currentDate.addDays(1);
      }
      this.selectedDays = dateArray
    },
    setCurrentMonth(month){
      if(month === 'next'){
        this.currentMonth = this.nextMonth
      } else {
        this.currentMonth = new Date(this.currentMonth.setDate(0))
      }
      this.setMonthDays()
    },
    setMonthDays(){
      this.currentDaysInMonth = mapForMonthDays(getDaysInMonth(this.currentDateMonth, new Date(this.currentMonth).getFullYear()), this.currentDate)
      let nextMonth
      let currentMonth = new Date(this.currentMonth)
      if (currentMonth.getMonth() == 11) {
          nextMonth = new Date(currentMonth.getFullYear() + 1, 0, 1);
      } else {
          nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
      }
      this.nextMonth = nextMonth
      this.nextDaysInMonth = mapForMonthDays(getDaysInMonth(nextMonth.getMonth(), nextMonth.getFullYear()), this.currentDate)
    }
  },
})

function mapForMonthDays(monthArray, currentDate){
  return monthArray.map((day) => ({
    weekNumber: new Date(day).getWeek(),
    originalDay: day,
    dayOfWeek: new Date(day).getDay(),
    day: new Date(day).getDate(),
    getTime: new Date(day).getTime()
  }))
}

function getDaysInMonth(month = 0, year = new Date().getFullYear()) {
  let date = new Date(year, month, 1)
  let days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}