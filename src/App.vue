<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  metaInfo: {
    titleTemplate: '%s ~ Notational',
  },
};
</script>

<style lang="scss">
  @import 'assets/styles/variables';
  @import 'assets/styles/fonts';

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    background-color: color(white);
    box-sizing: border-box;
    font: {
      family: $font-sans-serif;
      size: $font-base-size;
    }
  }
  body {
    margin: 0;
  }
</style>
