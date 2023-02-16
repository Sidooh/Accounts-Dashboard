import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import { Invite } from "@nabcellent/sui-vue";

export const useInvitesStore = defineStore("invite", {
    state: () => ({
        invites: <Invite[]>[],
    }),

    actions: {
        async fetchInvites() {
            try {
                const { data } = await axios.get('invites?with=inviter')
                logger.log(data)
                this.invites = data
            } catch (e) {
                logger.error(e)
            }
        }
    }
})