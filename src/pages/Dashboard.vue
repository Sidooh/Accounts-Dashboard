<script setup lang="ts">
</script>

<template>

  <router-link to="users" >Users</router-link>
  <router-link to="accounts" >Accounts</router-link>
  <router-link to="invites" >Invites</router-link>
  <router-link to="security-questions" >Security Questions</router-link>

  <router-view></router-view>

</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
