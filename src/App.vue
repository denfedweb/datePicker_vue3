<template>
  <header>
    <Header/>
  </header>
  <main>
    <span class="ms-3">Options API:</span>
    <div class="card ms-2 px-2 mt-1 d-flex flex-row" @click="changeOpenedApi">
        <span>{{fullDate}}</span>
    </div>
    <div class="d-flex" v-if="optionsApiOpened">
        <div class="calendar-container" :class="{disabled: dateStore.disableDatePicker}">
          <DateComponent/>
          <TimeComponent :dateFrom="dateFrom" :dateTo="dateTo" v-if="!dateStore.timeHidden" />
        </div>
        <Sidebar v-if="dateStore.sidebarShowed"/>
    </div>
  </main>
</template>

<script setup>
import {ref, computed} from 'vue'
import Header from "@/components/Header.vue"
import DateComponent from "@/components/DateComponent/index.vue"
import TimeComponent from "@/components/TimeComponent/index.vue"
import {useDatesStore} from "@/stores/DatesStore"
import {useTimesStore} from "@/stores/TimesStore"
import Sidebar from "@/components/SideBarComponent/Sidebar.vue"

const dateStore = useDatesStore()
const timeStore = useTimesStore()

let optionsApiOpened = ref(false)
function changeOpenedApi(){
  optionsApiOpened.value = !optionsApiOpened.value
}

const fullDate = computed(()=>{
  const dateFrom = returnFullDate(dateStore.currentDate)
  const timeFrom = timeStore.timeFrom
  const timeTo = timeStore.timeTo
  const dateTo = dateStore.toDate ? ` - ${returnFullDate(dateStore.toDate)}, ${timeStore.timeTo}` : ''

  return `${dateFrom}, ${timeFrom}${dateTo ? dateTo : timeTo != '00:00' ? ` - ${dateFrom}, ${timeTo}` : ''}`
})

const dateFrom = computed(()=>{
  return returnFullDate(dateStore.currentDate, false)
})
const dateTo = computed(()=>{
  return dateStore.toDate ? returnFullDate(dateStore.toDate, false) : ''
})

function returnFullDate(val, shortenedMonth = true) {
  let date = new Date(val)
  let month = dateStore.month[date.getMonth()]
  let day = date.getDate()
  let year = date.getFullYear()

  return `${shortenedMonth ? month.slice(0, 3) : month} ${day}, ${year}`
}

</script>

<style scoped>
.card {
  width: fit-content;
  cursor: pointer;
}
.calendar-container {
  width: 660px;
}
.disabled {
  opacity: .6;
  pointer-events: none;
}
</style>