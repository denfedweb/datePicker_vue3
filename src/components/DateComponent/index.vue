<template>
  <div class="mt-5 ms-2 calendar-container">
    <div class="d-flex justify-content-between">
      <button class="btn btn-primary" @click="changeCurrentMonth('prev')">prev</button>
      <span>
        {{store.month[new Date(store.currentMonth).getMonth()]}}
        {{new Date(store.currentMonth).getFullYear()}}
      </span>
      <span>
        {{store.month[new Date(store.nextMonth).getMonth()]}}
        {{new Date(store.nextMonth).getFullYear()}}
      </span>
      <button class="btn btn-primary" @click="changeCurrentMonth('next')">next</button>
    </div>
    <div class="d-flex mt-3">
      <DateSelector :weeks="weeks" :month="'currentDaysInMonth'" :selectFewDates="selectFewDates" @changeSelectFewDates="changeSelectFewDates" />
      <DateSelector :weeks="weeks" :month="'nextDaysInMonth'" :selectFewDates="selectFewDates" @changeSelectFewDates="changeSelectFewDates" />
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue'
import DateSelector from "@/components/DateComponent/DateSelector.vue"
import {useDatesStore} from "@/stores/DatesStore"

const store = useDatesStore()

const weeks = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

onBeforeMount(()=> {
  store.setMonthDays()
})

function changeCurrentMonth(month) {
  store.setCurrentMonth(month)
}

let selectFewDates = ref(false)

function changeSelectFewDates(flag) {
  selectFewDates.value = flag
}

</script>

<style>
.calendar-container {
  width: 600px;
}
</style>