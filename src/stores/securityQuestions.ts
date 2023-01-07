import { defineStore } from "pinia";
import axios from "axios";
import { SecurityQuestion } from "@/utils/types";

export const useSecurityQuestionsStore = defineStore("securityQuestion", {
    state: () => ({
        securityQuestions: <SecurityQuestion[]>[],
    }),

    actions: {
        async fetchSecurityQuestions() {
            try {
                const { data } = await axios.get('security-questions')
                console.log(data)
                this.securityQuestions = data
            } catch (e) {
                console.error(e)
            }
        }
    }
})