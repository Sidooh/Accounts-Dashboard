import {defineStore} from "pinia";
import axios from "axios";
import router from "../routes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {}
  }),

  actions: {
    async authenticate(email: string, password: string) {

      try {
        const data: { access_token: string } = await axios.post("users/signin", {
          email,
          password
        })

        this.user = {
          token: data.access_token
        }

        localStorage.setItem("TOKEN", data.access_token);

        axios.defaults.headers.common['Authorization'] = "Bearer " + data.access_token;

      } catch (response: any) {
        if (response.status === 400 && response.data) {
          throw new Error(response.data.errors[0].message)
        }
        throw new Error('Something went wrong, contact support')
      }
    },

    getToken() {
      const token = localStorage.getItem("TOKEN")

      if (!token) {
        this.logout()
        return
      }

      return token
    },

    checkLocalAuth() {
      this.getToken()
    },

    async logout() {
      localStorage.removeItem('TOKEN')

      this.$reset()

      await router.push({name: 'login'})
    }
  }
})