<template>
    <div class="ms-4 times-block">
        <div class="d-flex justify-content-between">
            <span>From: {{dateFrom}}</span>
            <span>
                <TimeSelector :timeVar="'timeFrom'" />
            </span>
        </div>
        <div class="d-flex justify-content-between">
            <span>To: {{dateTo || dateFrom}}</span>
            <span>
                <TimeSelector :timeVar="'timeTo'" />
            </span>
        </div>
    </div>
</template>

<script setup>
import {defineProps} from "vue"
import {useDatesStore} from "@/stores/DatesStore"
import {useTimesStore} from "@/stores/TimesStore"
import TimeSelector from "./TimeSelector.vue";

const props = defineProps({
  dateFrom: String,
  dateTo: String,
})
</script>

<style>
.times-block{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 50px;
}
</style>