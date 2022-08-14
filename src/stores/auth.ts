import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: '',
    user: {}
  }),

  actions: {
    async authenticate(email: string, password: string) {

      try {
        const data = await axios.post("users/signin", {
          email,
          password
        })

        this.token = data.data.access_token
        this.user = {
          token: data.data.access_token
        }

        //TODO:
        localStorage.setItem("TOKEN", data.data.access_token);

        axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.access_token;

      } catch (error: any) {
        if (error.response.status === 400 && error.response.data) {
          throw new Error(error.response.data.errors[0].message)
        }
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