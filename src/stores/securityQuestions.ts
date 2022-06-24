import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "./auth";

export const useSecurityQuestionsStore = defineStore("securityQuestion", {
    state: () => ({
        securityQuestions: [],
    }),

    getters: {},

    actions: {
        async fetchSecurityQuestions() {
            console.log('fetch securityQuestions')
            try {
                const data = await axios.get('/security-questions')
                this.securityQuestions = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})