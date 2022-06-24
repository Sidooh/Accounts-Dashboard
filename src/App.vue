<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import DefaultLayout from './components/layout/Default.vue'
import {computed, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

const layout = computed(() =>
    route.meta.layout || DefaultLayout
)

</script>

<template>
  <!--  <ReloadPWA/>-->

  <component :is="layout"/>

</template>

<style>
#app {
  font-family: "Proxima Nova Rg", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
