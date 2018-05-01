<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">Sign Up</h1>
      <form>
        <div
          v-if="error"
          class="auth__message"
        >
          {{ error.message }}
        </div>
        <div class="auth__field">
          <label class="auth__label">Full Name</label>
          <input
            v-model="displayName"
            v-focus
            :class="['auth__input', { 'success': !$v.displayName.$invalid }]"
            placeholder="Gavin Belson"
            spellcheck="false"
            type="text"
          >
        </div>
        <div class="auth__field">
          <label class="auth__label">Email Address</label>
          <input
            v-model="email"
            :class="['auth__input', { 'success': !$v.email.$invalid }]"
            placeholder="gavin@hooli.xyz"
            spellcheck="false"
            type="text"
          >
        </div>
        <div class="auth__field">
          <label class="auth__label">Password</label>
          <input
            v-model="password"
            :class="['auth__input', { 'success': !$v.password.$invalid }]"
            placeholder="Password"
            type="password"
          >
        </div>

        <button
          :class="['auth__button', { loading }]"
          :disabled="$v.validationGroup.$invalid || loading"
          @click.prevent="onClickSignUp"
          @keyup.enter="onClickSignUp"
        >
          {{ loading ? 'Creating account...' : 'Sign Up' }}
        </button>
      </form>

      <div class="auth__help">
        Already have a Notational account?
        <router-link :to="{ name: 'LogIn', query: { email: this.email }}">
          Log in here
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import {
  email,
  minLength,
  required,
} from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
  data: () => ({
    displayName: null,
    email: null,
    error: null,
    loading: false,
    password: null,
  }),
  created() {
    if (this.$route.query.email) this.email = this.$route.query.email;
  },
  methods: {
    ...mapActions([
      'SIGN_UP_USER',
    ]),
    onClickSignUp() {
      this.loading = true;
      this
        .SIGN_UP_USER({
          displayName: this.displayName,
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push({ name: 'App' }))
        .catch((err) => {
          this.loading = false;
          this.error = err;
        });
    },
  },
  validations: {
    displayName: {
      required,
      minLength: minLength(2),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    validationGroup: [
      'displayName',
      'email',
      'password',
    ],
  },
  metaInfo: {
    title: 'Sign Up',
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
  @import '../assets/styles/auth';
</style>
