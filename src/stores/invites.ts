import {defineStore} from "pinia";
import axios from "axios";

export const useInvitesStore = defineStore("invite", {
    state: () => ({
        invites: <Invite[]>[],
    }),

    getters: {},

    actions: {
        async fetchInvites() {
            console.log('fetch invites')
            try {
                const data = await axios.get('invites')
                this.invites = data.data
            } catch (e) {
                console.error(e)
            }
        }
    }
})