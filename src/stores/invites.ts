import { defineStore } from "pinia";
import axios from "axios";
import { Invite, logger } from "@nabcellent/sui-vue";

export const useInvitesStore = defineStore("invite", {
    state: () => ({
        invites: <Invite[]>[],
    }),

    actions: {
        async fetchInvites() {
            try {
                const { data } = await axios.get('invites?with=inviter')
                console.log(data)
                this.invites = data
            } catch (e) {
                logger.error(e)
            }
        }
    }
})