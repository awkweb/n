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
  @import 'assets/styles/functions';
  @import 'assets/styles/fonts';

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font: {
      family: $font-sans-serif;
      size: $font-base-size;
    }
  }
  body {
    margin: 0;
    min-height: 100vh;
    transition: {
      duration: $transition-duration;
      property: background-color, color;
    }
    &.light {
      background-color: color(light, background);
      color: color(light, font);
    }
    &.dark {
      background-color: color(dark, background);
      color: color(dark, font);
    }
  }
  button { font-family: $font-sans-serif; }
  #app {
    min-height: 100vh;
  }
</style>
