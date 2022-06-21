<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Dashboard from './pages/Dashboard.vue'
import ReloadPWA from "./components/ReloadPWA.vue";

</script>

<template>
  <ReloadPWA/>

  <router-link to="/">
    <img alt="Sidooh logo" src="./assets/logo.png" width="400"/>
  </router-link>
  <Dashboard/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
