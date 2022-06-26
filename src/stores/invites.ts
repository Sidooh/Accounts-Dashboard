import {defineStore} from "pinia";
import axios from "axios";
import {useAuthStore} from "./auth";

export const useInvitesStore = defineStore("invite", {
    state: () => ({
        invites: [],
    }),

    getters: {},

    actions: {
        async fetchInvites() {
            console.log('fetch invites')
            try {
                const data = await axios.get('invites')
                this.invites = data.data
            } catch (e) {
                alert(e)
                console.error(e)
            }
        }
    }
})