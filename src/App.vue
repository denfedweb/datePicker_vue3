<script setup>
import {ref} from 'vue'
import Header from "@/components/Header.vue"
import DateComponent from "@/components/DateComponent/index.vue"
import {useDatesStore} from "@/stores/DatesStore"

const store = useDatesStore()

let optionsApiOpened = ref(false)
function changeOpenedApi(){
  optionsApiOpened.value = !optionsApiOpened.value
}

</script>

<template>
  <header>
    <Header/>
  </header>
  <main>
    <span class="ms-3">Options API:</span>
    <div class="card ms-2 px-2 mt-1" @click="changeOpenedApi">
      {{store.fullDate}}
    </div>
    <template v-if="optionsApiOpened">
      <DateComponent/>
    </template>
  </main>
</template>

<style scoped>
.card {
  width: fit-content;
  cursor: pointer;
}
</style>