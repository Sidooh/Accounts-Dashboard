import { defineStore } from "pinia";
import axios from "axios";
import { SecurityQuestion } from "@/utils/types";
import { logger } from "@/utils/logger";

export const useSecurityQuestionsStore = defineStore("securityQuestion", {
    state: () => ({
        securityQuestions: <SecurityQuestion[]>[],
    }),

    actions: {
        async fetchSecurityQuestions() {
            try {
                const { data } = await axios.get('security-questions')
                logger.log(data)
                this.securityQuestions = data
            } catch (e) {
                logger.error(e)
            }
        }
    }
})