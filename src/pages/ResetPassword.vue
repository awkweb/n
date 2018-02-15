<template>
  <div class="auth">
    <div
      v-if="success"
      class="auth__container"
    >
      <h1 class="auth__title">Done And Done!</h1>
      <div class="auth__message success">
        We've sent an email to <b>{{ email }}</b> with password reset instructions.
      </div>
      <div class="auth__instructions">
        If the email doesn't show up soon, check your spam folder.
        We sent it from <b>yo@notational.com</b>.
      </div>
      <router-link
        :to="{ name: 'LogIn', query: { email: this.email }}"
        class="auth__button link"
      >
        <span>Return to Login</span>
      </router-link>
    </div>
    <div
      v-else
      class="auth__container"
    >
      <h1 class="auth__title">Reset Password</h1>
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
            placeholder="jared@piedpiper.com"
            spellcheck="false"
            type="text"
          >
        </div>
        <button
          :disabled="$v.validationGroup.$invalid"
          @click.prevent="onClickResetPassword"
          @keyup.enter="onClickResetPassword"
          :class="['auth__button', { 'loading': loading }]"
        >
          {{ loading ? 'Resetting Password...' : 'Reset Password' }}
        </button>
      </form>

      <div class="auth__help">
        <router-link :to="{ name: 'LogIn', query: { email: this.email }}">
          Return to login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { email, required } from 'vuelidate/lib/validators';

export default {
  name: 'LogIn',
  data: () => ({
    email: null,
    error: null,
    loading: false,
    success: false,
  }),
  created() {
    if (this.$route.query.email) this.email = this.$route.query.email;
  },
  methods: {
    onClickResetPassword() {
      this.loading = true;
      api
        .sendPasswordResetEmail(this.email)
        .then(() => { this.success = true; })
        .catch((err) => { this.error = err; })
        .finally(() => { this.loading = false; });
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    validationGroup: [
      'email',
    ],
  },
  metaInfo: {
    title: 'Log In',
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
  @import '../assets/styles/auth';
</style>
