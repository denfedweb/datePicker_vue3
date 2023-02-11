<template>
  <div class="ms-5 card p-3">
    <span>Select by:</span>
    <ul class="list-group mt-5">
      <li v-for="(item, idx) in sidebarList" @click="item.action(item)" :key="idx" class="list-group-item py-3" :class="{active: item.selected}">{{item.name}}</li>
    </ul>
  </div>
</template>

<script setup>
import {reactive, onBeforeUnmount} from "vue"
import {useDatesStore} from "@/stores/DatesStore"

const dateStore = useDatesStore()

const sidebarList = reactive([
  {name: 'Today', action: (item) => setCurrentDay(item), day: 0,},
  {name: 'Yesterday', action: (item) => setCurrentDay(item), day: 1,},
  {name: 'Last 7 Day', action: (item) => setLastDays(item), lastDays: 7,},
  {name: 'Last 14 Days', action: (item) => setLastDays(item), lastDays: 14,},
  {name: 'Last 30 Days', action: (item) => setLastDays(item), lastDays: 30,},
  {name: 'Whole Period', action: (item) => setWholePeriod(item),},
  {name: 'Custom', action: (item) => setCurrentDay(item, false), selected: true, day: 0,},
])

const dateNow = new Date().setHours(0,0,0,0)

function setCurrentDay(item, disabledFlag = true) {
  changeSelected(item, disabledFlag)
  const date = new Date(dateNow)

  date.setDate(date.getDate() - item.day)
  dateStore.currentDate = new Date(date)
  dateStore.toDate = null
  dateStore.selectedDays = []
}

function setLastDays(item) {
  changeSelected(item)
  const date = new Date(dateNow)

  date.setDate(date.getDate() - item.lastDays)
  dateStore.currentDate = new Date(date)
  dateStore.toDate = dateNow
  dateStore.setCurrentDays()
}

function setWholePeriod(item) {
  changeSelected(item)
  dateStore.currentDate = new Date(dateStore.currentDaysInMonth[0].originalDay)
  dateStore.toDate = dateNow
  dateStore.setCurrentDays()
}

function changeSelected(item, disabledFlag = true) {
  sidebarList.forEach((item)=>{item.selected = false})
  item.selected = true
  dateStore.disableDatePicker = disabledFlag
}

onBeforeUnmount(() => {
  dateStore.disableDatePicker = false
})
</script>

<style scoped>
.list-group-item:hover{
  background-color: rgba(13, 110, 253, 0.53);
  color: white;
}
</style>