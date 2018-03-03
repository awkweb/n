<template>
  <div class="editor-footer">
    <div
      v-if="activeNote"
      class="editor-footer__details"
    >
      <span class="mono">{{ activeNote.body | wordCount }}</span> words ·
      <span class="mono">{{ activeNote.body | charCount }}</span> chars
    </div>
    <div
      v-else
      class="editor-footer__details"
    >
      This is your moment of glory.
    </div>
    <div class="editor-footer__actions">
      <button
        class="editor-footer__button"
      >
        <NewIcon class="editor-footer__button-icon" />
      </button>
      <button
        @click="onClickToggleTheme"
        class="editor-footer__button"
      >
        <ThemeIcon class="editor-footer__button-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import NewIcon from '@/assets/icons/plus.svg';
import ThemeIcon from '@/assets/icons/eye.svg';

export default {
  name: 'EditorFooter',
  components: {
    NewIcon,
    ThemeIcon,
  },
  props: {
    activeNote: {
      required: true,
    },
  },
  methods: {
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
      .editor-footer__button-icon { fill: color(light, font); }
    }
    &:last-child { margin-right: 0; }
  }
  .editor-footer__button-icon {
    fill: color(light, copy);
    height: 25px;
    pointer-events: none;
    transition: {
      property: fill;
      duration: $transition-duration;
    }
  }
</style>
