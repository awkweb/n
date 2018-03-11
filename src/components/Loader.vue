<template>
  <div class="loader">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
  @keyframes loader {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: .1;
      transform: translateY(-1rem);
    }
  }
  .loader {
    @include flex-row;
    @include flex-center;
    div {
      animation: {
        name: loader;
        direction: alternate;
        duration: .6s;
        iteration-count: infinite;
      }
      background: color(light, primary);
      border-radius: 50%;
      height: 1rem;
      margin: {
        left: .2rem;
        right: .2rem;
      }
      width: 1rem;
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
  .editor {
    .loader { min-height: 70vh; }
  }
  .editor.dark {
    .loader div { background: color(dark, primary); }
  }
</style>
