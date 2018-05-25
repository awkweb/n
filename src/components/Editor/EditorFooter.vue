<template>
  <div class="editor-footer">
    <div
      v-if="activeNote"
      class="editor-footer__details"
    >
      <span class="mono">{{ charCount }}</span> {{ charCount > 1 ? 'characters': 'character' }} ∙
      <span class="mono">{{ wordCount }}</span> {{ wordCount > 1 ? 'words': 'word' }}
    </div>
    <div
      v-else
      class="editor-footer__details"
    >
      This is your moment of glory.
    </div>
    <div class="editor-footer__actions">
      <button
        @click="onClickToggleTheme"
        class="editor-footer__button"
      >
        <DarkThemeIcon
          v-if="theme === 'light'"
          class="editor-footer__button-icon"
        />
        <LightThemeIcon
          v-else
          class="editor-footer__button-icon"
        />
      </button>
      <button
        class="editor-footer__button"
      >
        <NewIcon class="editor-footer__button-icon" />
      </button>
      <div
        v-click-outside="onClickOutsideUserMenu"
        class="editor-footer__menu-container"
      >
        <button
          @click="onClickToggleUserMenu"
          class="editor-footer__button"
        >
          <UserIcon class="editor-footer__button-icon" />
        </button>
        <ul :class="['editor-footer__menu', { active: isUserMenuOpen }]">
          <li class="editor-footer__menu-item">
            <router-link :to="{ name: 'Settings'}">Settings</router-link>
          </li>
          <li class="editor-footer__menu-item">
            <button @click="onClickLogOut">Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapMutations,
} from 'vuex';
import DarkThemeIcon from '@/assets/icons/moon.svg?inline';
import LightThemeIcon from '@/assets/icons/sun.svg?inline';
import NewIcon from '@/assets/icons/plus.svg?inline';
import UserIcon from '@/assets/icons/user.svg?inline';

export default {
  name: 'EditorFooter',
  components: {
    DarkThemeIcon,
    LightThemeIcon,
    NewIcon,
    UserIcon,
  },
  props: {
    activeNote: {
      type: Object,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isUserMenuOpen: false,
  }),
  computed: {
    ...mapActions([
      'LOG_OUT_USER',
    ]),
    ...mapMutations([
      'RESET_EDITOR',
    ]),
    charCount() {
      return this.activeNote && this.activeNote.body ?
        this.activeNote.body.replace(/\s/g, '').length :
        0;
    },
    wordCount() {
      return this.activeNote && this.activeNote.body ?
        (this.activeNote.body.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length :
        0;
    },
  },
  methods: {
    onClickLogOut() {
      this
        .LOG_OUT_USER()
        .finally(() => {
          this.RESET_EDITOR();
          this.$router.push({ name: 'LogIn' });
        });
    },
    onClickOutsideUserMenu() {
      if (this.isUserMenuOpen) {
        this.isUserMenuOpen = false;
      }
    },
    onClickToggleTheme() {
      this.$emit('handleOnClickToggleTheme');
    },
    onClickToggleUserMenu() {
      this.isUserMenuOpen = !this.isUserMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-footer {
    @include flex-row;
    color: color(light, copy);
    font-size: .75rem;
    justify-content: space-between;
    padding: {
      left: .35rem;
      right: .35rem;
      top: .65rem;
    }
  }

  .editor-footer__details {
    @include flex-row;
    align-items: center;
    margin-bottom: .25rem;
    .mono {
      font-family: $font-mono;
      margin: {
        left: .2rem;
        right: .2rem;
      }
      &:first-child { margin-left: 0; }
    }
  }

  .editor-footer__actions {
    @include flex-row;
  }

  .editor-footer__button {
    @include button;
    @include flex-row;
    @include flex-center;
    background-color: transparent;
    border: {
      color: color(light, input-border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    box-shadow: $box-shadow;
    height: 1.5rem;
    margin-right: 6px;
    padding: 0;
    transition: {
      property: all;
      duration: $transition-duration;
    }
    width: 1.5rem;
    &:hover {
      border-color: color(light, input-border-hover);
      box-shadow: $box-shadow-button-hover;
      transform: translateY(-1px);
      .editor-footer__button-icon { stroke: color(light, font); }
    }
    &:active {
      box-shadow: none;
      transform: translateY(1px);
    }
  }

  .editor-footer__button-icon {
    height: 20px;
    pointer-events: none;
    stroke: color(light, copy);
    transition: {
      property: stroke;
      duration: $transition-duration;
    }
  }

  .editor-footer__menu-container {
    position: relative;
    .editor-footer__button { margin-right: 0; }
  }

  .editor-footer__menu {
    background-color: color(light, background);
    border: {
      color: color(light, input-border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    bottom: 1.85rem;
    box-shadow: $box-shadow;
    list-style-type: none;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    pointer-events: none;
    transform: translateY(-5px);
    transition: {
      property: all;
      duration: $transition-duration;
    }
    right: 0;
    width: 5rem;
    &.active {
      @include flex-column;
      opacity: 1;
      pointer-events: all;
      transform: translateY(0px);
    }
  }

  .editor-footer__menu-item {
    color: color(light, font);
    cursor: pointer;
    transition: {
      duration: $transition-duration;
      property: background;
    }
    white-space: nowrap;
    &:hover {
      background-color: color(light, highlight);
    }
    a {
      color: color(light, font);
      text-decoration: none;
    }
    button {
      -webkit-appearance: none;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      outline: 0;
    }
    a,
    button {
      display: block;
      font-size: .75rem;
      padding: {
        bottom: .35rem;
        left: .75rem;
        right: .75rem;
        top: .35rem;
      }
    }
  }

  .editor.dark {
    .editor-footer {
      color: color(dark, copy);
    }
    .editor-footer__button {
      border-color: color(dark, input-border);
      &:hover {
        border-color: color(dark, input-border-hover);
        .editor-footer__button-icon { stroke: color(dark, font); }
      }
    }
    .editor-footer__button-icon {
      stroke: color(dark, copy);
    }
  }
</style>
