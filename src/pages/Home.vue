<template>
  <div class="home">
    <nav>
      <div>Notational</div>

      <div>
        <a href="mailto:yo@notational.co">Contact</a>
        <router-link :to="{ name: 'LogIn'}">Log In</router-link>
        <router-link :to="{ name: 'SignUp'}">Sign Up Free</router-link>
      </div>
    </nav>

    <div>
      <h1>Notes at the speed of thought.</h1>
    </div>

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
