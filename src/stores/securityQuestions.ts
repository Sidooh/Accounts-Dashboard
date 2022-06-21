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
                const data = await axios.get('http://localhost:8000/api/v1/security-questions')
                this.securityQuestions = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})