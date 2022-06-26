import {defineStore} from "pinia";
import axios from "axios";

export const useSecurityQuestionsStore = defineStore("securityQuestion", {
    state: () => ({
        securityQuestions: <Object[]>[],
    }),

    getters: {},

    actions: {
        async fetchSecurityQuestions() {
            console.log('fetch securityQuestions')
            try {
                const data = await axios.get('security-questions')
                this.securityQuestions = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})