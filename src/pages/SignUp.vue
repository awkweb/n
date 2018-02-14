<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">Sign Up</h1>
      <form>
        <div class="auth__field">
          <label class="auth__label">Email Address</label>
          <input
            v-model="email"
            v-focus
            :class="['auth__input', { 'success': !$v.email.$invalid }]"
            placeholder="gavin@hooli.xyz"
            type="text"
          >
        </div>
        <div class="auth__field">
          <label class="auth__label">Password</label>
          <input
            v-model="password"
            :class="['auth__input', { 'success': !$v.password.$invalid }]"
            placeholder="Super, secret"
            type="password"
          >
        </div>
        <div class="auth__field">
          <label class="auth__label">Confirm Password</label>
          <input
            v-model="confirmPassword"
            :class="['auth__input', { 'success': !$v.confirmPassword.$invalid }]"
            placeholder="You know the drill"
            type="password"
          >
        </div>

        <button
          :disabled="$v.validationGroup.$invalid"
          @click.prevent="onClickSignUp"
          @keyup.enter="onClickSignUp"
          :class="['auth__button', { 'loading': loading }]"
        >
          {{ loading ? 'Creating account...' : 'Get Started!' }}
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
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
  data: () => ({
    email: null,
    password: null,
    confirmPassword: null,
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
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
    validationGroup: [
      'email',
      'password',
      'confirmPassword',
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
