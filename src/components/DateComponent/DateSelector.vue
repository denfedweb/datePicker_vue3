<template>
  <div>
    <div class="grid-container">
      <p class="grid-element" v-for="week in props.weeks" :key="week">{{week}}</p>
      <div v-for="(monthDay, idx) in store[props.month]"
           :key="idx"
           :data-date="monthDay.originalDay"
           @click="setDate(monthDay, month)"
           @mouseenter="pushDate(monthDay)"
           @mousedown="downElement(monthDay)"
           @mouseup="upElement"
           :class="{
             selected: monthDay.getTime === currentDayGetTime || monthDay.getTime === toDateGetTime,
             betweenDay: store.selectedDays.includes(monthDay.getTime)
           }"
           class="day grid-element"
      >
        <span>{{monthDay.day}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed, defineEmits} from "vue"
import {useDatesStore} from "@/stores/DatesStore"

const props = defineProps({
  weeks: Array,
  month: String,
  selectFewDates: Boolean,
})

const emit = defineEmits(['changeSelectFewDates'])

const store = useDatesStore()

function setDate(date) {
  store.currentDate = new Date(date.originalDay).setHours(0,0,0,0)
  store.toDate = null
  store.selectedDays = []
}

const currentDayGetTime = computed(()=> {
  return new Date(store.currentDate).getTime()
})

const toDateGetTime = computed(()=> {
  return new Date(store.toDate).getTime()
})

function downElement(date) {
  setDate(date)
  emit('changeSelectFewDates', true)
}

function upElement() {
  emit('changeSelectFewDates', false)
}

function pushDate(date) {
  if (props.selectFewDates && store.currentDate <= date.getTime) {
    store.toDate = new Date(date.originalDay).setHours(0,0,0,0)
    store.setCurrentDays()
  }
}

</script>

<style scoped>
.grid-container {
  margin: 0 20px;
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.day {
  cursor: pointer;
}
.betweenDay {
  background: rgb(13 110 253 / 52%);
  color: white;
}
.selected {
  background: #0d6efd;
  color: white;
}
.grid-element {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>