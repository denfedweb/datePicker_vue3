<template>
  <div>
    <ul class="list-group list-group-horizontal p-3">
      <li class="list-group-item">
        <div class="form-check form-switch">
          <span>Light</span>
          <input v-model="darkMode" @change="changeMode" class="form-check-input" type="checkbox" role="switch">
          <span>Dark</span>
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-check form-switch">
          <span>Hide Time</span>
          <input v-model="timeHidden" @change="changeTimeFlag" class="form-check-input" type="checkbox" role="switch">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-check form-switch">
          <span>Show SideBar</span>
          <input v-model="sideBarShow" @change="changeSidebarFlag" class="form-check-input" type="checkbox" role="switch">
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue"
import {useDatesStore} from "../stores/DatesStore"

const dateStore = useDatesStore()

const darkMode = ref(false)
const timeHidden = ref(false)
const sideBarShow = ref(false)

function changeMode() {
    document.querySelector('html').setAttribute('data-bs-theme', darkMode.value ? 'dark' : 'light')
}

function changeTimeFlag() {
    dateStore.timeHidden = timeHidden.value
}

function changeSidebarFlag() {
    console.log(sideBarShow.value)
    dateStore.sidebarShowed = !sideBarShow.value
}
</script>