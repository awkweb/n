<template>
  <div
    v-if="user"
    class="editor"
  >
    <h1>editor</h1>
    <div>{{ user.uid }}</div>
    <div>{{ user.displayName }}</div>
    <div>{{ user.emailVerified }}</div>
    <button
      @click="onClickLogOut"
    >
      Log Out
    </button>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

export default {
  name: 'Editor',
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  mounted() {
    this.FETCH_USER();
  },
  methods: {
    ...mapMutations([
      'SET_USER',
    ]),
    ...mapActions([
      'FETCH_USER',
      'LOG_OUT_USER',
    ]),
    onClickLogOut() {
      this
        .LOG_OUT_USER()
        .finally(() => this.$router.push({ name: 'LogIn' }));
    },
  },
  metaInfo: {
    title: 'App',
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
</style>
