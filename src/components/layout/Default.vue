<script setup lang="ts">
import NavBar from "./NavBar.vue"
import SideNav from "./SideNav.vue";
import {computed} from "vue";
import {useCoreStore} from "../../stores/core";

const store = useCoreStore()

const containerStyle = computed(() => store.isFluid ? 'container-fluid' : 'container')
</script>

<template>
  <main id="top" class="main">
    <div :class="containerStyle" data-layout="container">
      <!--  Sidebar -->
      <SideNav/>
      <!--  -->

      <div class="content">
        <!--  NavBar -->
        <NavBar/>
        |
        |
        <router-link to="invites">Invites</router-link>
        |
        <router-link to="security-questions">Security Questions</router-link>

        <br>
        <router-link to="login">Login</router-link>

        <!--  -->

        <!--  Content -->
        <router-view></router-view>

        <!--  Footer? -->

      </div>
    </div>
  </main>

</template>

<style scoped>

</style>