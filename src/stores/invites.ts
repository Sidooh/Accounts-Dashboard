import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@nabcellent/sui-vue";
import { Invite } from "@/utils/types";

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