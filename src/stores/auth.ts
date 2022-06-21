import {defineStore} from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null
  }),

  actions: {
    authenticate: async () => {
      console.log('authenticate')

      try {
        const data = await axios.post("/users/signin", {
          email: "aa@a.a",
          password: "12345678"
        })

        //TODO:
        localStorage.setItem("TOKEN", data.data.token);

        axios.defaults.headers.common['Authorization'] = "Bearer " + data.data.token;

      } catch (e) {
        alert(e)
        console.error(e)
      }
    }
  }
})