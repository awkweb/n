<template>
  <div :class="['settings', theme]">
    <div class="settings__container">
      <h1>Settings</h1>
      <div>
        <h3>Keybindings</h3>
        <ul>
          <li><span>tab</span><span>focus editor</span></li>
          <li><span>esc</span><span>focus search</span></li>
          <li><span>up/down</span><span>navigate notes up/down</span></li>
          <li><span>mod + enter</span><span>create</span></li>
          <li><span>mod + d</span><span>delete</span></li>
          <li><span>mod + e</span><span>rename</span></li>
          <li><span>mod + .</span><span>toggle theme</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
  mounted() {
    this
      .FETCH_USER()
      .then(() => this.FETCH_USER_DATA());
  },
  methods: {
    ...mapActions([
      'FETCH_USER',
      'FETCH_USER_DATA',
    ]),
  },
  metaInfo() {
    return {
      title: 'Settings',
      bodyAttrs: {
        class: this.theme,
      },
    };
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';

  .settings {
    ul li {
      display: flex;
      justify-content: space-between;
    }
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
