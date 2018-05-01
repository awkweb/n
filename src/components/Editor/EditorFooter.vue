<template>
  <div class="editor-footer">
    <div
      v-if="activeNote"
      class="editor-footer__details"
    >
      <span class="mono">{{ charCount }}</span> {{ charCount > 1 ? 'chars': 'char' }} ·
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
        v-if="activeNote"
        @click="onClickToggleFullScreen"
        class="editor-footer__button"
      >
        <FullScreenIcon class="editor-footer__button-icon" />
      </button>
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
    </div>
  </div>
</template>

<script>
import NewIcon from '@/assets/icons/plus.svg';
import DarkThemeIcon from '@/assets/icons/moon.svg';
import LightThemeIcon from '@/assets/icons/sun.svg';
import FullScreenIcon from '@/assets/icons/maximize.svg';

export default {
  name: 'EditorFooter',
  components: {
    FullScreenIcon,
    LightThemeIcon,
    NewIcon,
    DarkThemeIcon,
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
  computed: {
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
    onClickToggleFullScreen() {
      this.$emit('handleOnClickToggleFullScreen');
    },
    onClickToggleTheme() {
      this.$emit('handleOnClickToggleTheme');
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
    background-color: transparent;
    border: {
      color: color(light, border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    height: 1.5rem;
    margin-right: 6px;
    padding: 0;
    transition: {
      property: border-color;
      duration: $transition-duration;
    }
    width: 1.5rem;
    &:hover {
      border-color: color(light, border-hover);
      .editor-footer__button-icon { stroke: color(light, font); }
    }
    &:last-child { margin-right: 0; }
  }
  .editor-footer__button-icon {
    height: 20px;
    pointer-events: none;
    stroke: color(light, copy);
    transition: {
      property: fill;
      duration: $transition-duration;
    }
  }

  .editor.dark {
    .editor-footer {
      color: color(dark, copy);
    }
  }
</style>
