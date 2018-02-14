<template>
  <div class="home">
    <h1>home</h1>
    <router-link :to="{ name: 'LogIn'}">Log In</router-link>
    <router-link :to="{ name: 'SignUp'}">Sign Up Free</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Notes at the speed of thought.',
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
</style>
