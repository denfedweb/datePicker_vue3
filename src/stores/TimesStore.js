import {defineStore} from 'pinia'

export const useTimesStore = defineStore('TimesStore', {
    state: () => {
        return {
            timeFrom: new Date().timeNow(),
            timeTo: '00:00',
        }
    },
})