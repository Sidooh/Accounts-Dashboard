import {defineStore} from "pinia";


export const useCoreStore = defineStore("core", {
    state: () => ({
        isNavbarVerticalCollapsed: false,
        theme: 'light',
        isFluid: false,
        navbarStyle: 'transparent',
        // navbarPosition: 'vertical'
        // isFluid: false, JSON.parse(localStorage.getItem("isFluid"))
    }),

    actions: {
        toggleLayout() {
            this.isFluid = !this.isFluid
        },
        toggleTheme() {
            this.theme = this.theme === 'dark' ? 'light' : 'dark'
        },
        toggleSideNav() {
            this.isNavbarVerticalCollapsed = !this.isNavbarVerticalCollapsed
        }
    }
})