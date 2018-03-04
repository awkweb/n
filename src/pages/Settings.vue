<template>
  <div class="settings">
    <div class="settings__container">
      <h1>Settings</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  metaInfo: {
    title: 'Settings',
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';

  .settings {
  }
  .settings__container {
    margin: {
      left: auto;
      right: auto;
    }
    max-width: 34rem;
    padding: {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      top: .5rem;
    }
  }
</style>
