<template>
  <div class="auth">
    <div class="auth__container">
      <h1 class="auth__title">Welcome Back</h1>
      <form>
        <div
          v-if="error"
          class="auth__message"
        >
          {{ error.message }}
        </div>
        <div class="auth__field">
          <label class="auth__label">Email Address</label>
          <input
            v-model="email"
            v-focus
            class="auth__input"
            placeholder="erlich@aviato.com"
            spellcheck="false"
            type="text"
          >
        </div>
        <div class="auth__field">
          <label class="auth__label">Password</label>
          <button
            @click.prevent="onClickToggleShowPassword"
            class="auth__button-show-password"
            tabindex="-1"
            type="button"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="auth__input"
            placeholder="Password"
            spellcheck="false"
          >
        </div>
        <button
          :class="['auth__button', { loading }]"
          :disabled="$v.validationGroup.$invalid || loading"
          @click.prevent="onClickLogIn"
          @keyup.enter="onClickLogIn"
        >
          {{ loading ? 'Logging In...' : 'Log In' }}
        </button>
      </form>

      <div class="auth__help">
        Need a Notational account?
        <router-link :to="{ name: 'SignUp', query: { email: this.email }}">
          Create an account
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
  name: 'LogIn',
  data: () => ({
    email: null,
    error: null,
    loading: false,
    password: null,
    showPassword: false,
  }),
  created() {
    if (this.$route.query.email) this.email = this.$route.query.email;
  },
  methods: {
    ...mapActions([
      'LOG_IN_USER',
    ]),
    onClickToggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    onClickLogIn() {
      this.loading = true;
      this
        .LOG_IN_USER({
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push({ name: 'App' }))
        .catch((err) => {
          this.error = err;
          this.loading = false;
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
    validationGroup: [
      'email',
      'password',
    ],
  },
  metaInfo: {
    title: 'Log In',
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/auth';
</style>
