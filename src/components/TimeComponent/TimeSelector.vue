<template>
    <div class="time-selector" data-v-f9912dd2="">
        <input v-model="time" @change="changeTime" type="time" data-v-f9912dd2="">
    </div>
</template>

<script setup>
import {defineProps, ref, onBeforeMount} from "vue"
import {useTimesStore} from "@/stores/TimesStore"

const timeStore = useTimesStore()

let time = ref('00:00')

const props = defineProps({
  timeVar: String,
})

onBeforeMount(()=> {
  time.value = timeStore[props.timeVar]
})

function changeTime() {
    timeStore[props.timeVar] = time.value
}
</script>