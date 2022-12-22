import { defineStore } from "pinia";
import axios from "axios";
import { Invite } from "@/utils/types";

export const useInvitesStore = defineStore("invite", {
    state: () => ({
        invites: <Invite[]>[],
    }),

    actions: {
        async fetchInvites() {
            try {
                const { data } = await axios.get('invites')
                console.log(data)
                this.invites = data
            } catch (e) {
                console.error(e)
            }
        }
    }
})