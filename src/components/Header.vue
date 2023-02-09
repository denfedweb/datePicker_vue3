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
          <input class="form-check-input" type="checkbox" role="switch">
        </div>
      </li>
      <li class="list-group-item">
        <div class="form-check form-switch">
          <span>Show SideBar</span>
          <input class="form-check-input" type="checkbox" role="switch">
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue"

let darkMode = ref(false)
function changeMode() {
  document.querySelector('html').setAttribute('data-bs-theme', darkMode.value ? 'dark' : 'light')
}


</script>