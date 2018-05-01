<template>
  <div class="editor-prompt">
    <div
      v-click-outside="onClickOutside"
      class="editor-prompt__body"
    >
      <header class="editor-prompt__title">{{ title }}</header>
      <div class="editor-prompt__description">{{ description }}</div>
      <div class="editor-prompt__buttons">
        <button
          :disabled="loading"
          @click="onClickCancel"
          class="editor-prompt__button cancel"
        >
          Cancel
        </button>
        <button
          :disabled="loading"
          @click="onClickConfirm"
          class="editor-prompt__button delete"
        >
          {{ confirmTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorPrompt',
  props: {
    confirmTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickOutside() {
      this.$emit('handleOnClickOutside');
    },
    onClickCancel() {
      this.$emit('handleOnClickOutside');
    },
    onClickConfirm() {
      this.$emit('handleOnClickConfirm');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-prompt {
    background-color: rgba(255,255,255,.75);
    bottom: 0;
    left: 0;
    padding: {
      left: 1rem;
      right: 1rem;
    }
    position: fixed;
    right: 0;
    top: 0;
  }
  .editor-prompt__body {
    background-color: color(light, background);
    border: {
      color: color(light, input-border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    box-shadow: $box-shadow;
    margin: {
      left: auto;
      right: auto;
      top: 5rem;
    }
    max-width: 25rem;
    overflow: hidden;
  }
  .editor-prompt__title {
    font: {
      size: 1.15rem;
      weight: 500;
    }
    margin-bottom: 1rem;
    padding: {
      left: 1.5rem;
      right: 1.5rem;
      top: 1.5rem;
    }
  }
  .editor-prompt__description {
    color: color(light, copy);
    font: {
      size: .95rem;
      weight: 400;
    }
    margin-bottom: 2rem;
    padding: {
      left: 1.5rem;
      right: 1.5rem;
    }
  }
  .editor-prompt__buttons {
    @include flex-row;
    background-color: #f9f9f9;
    justify-content: flex-end;
    padding: 1.5rem;
  }
  .editor-prompt__button {
    @include button;
    border: {
      radius: 2px;
      width: 0;
    }
    font: {
      size: .85rem;
      weight: 600;
    }
    padding: {
      bottom: .5rem;
      left: 1rem;
      right: 1rem;
      top: .5rem;
    }
    transition: {
      property: all;
      duration: $transition-duration;
    }
    &:disabled {
      opacity: .65;
      pointer-events: none;
    }
    &.cancel {
      background-color: transparent;
      border: 0;
      margin-right: 1rem;
    }
    &.delete {
      background-color: color(light, danger);
      border: {
        color: darken(color(light, danger), 5);
        style: solid;
        width: 1px;
      }
      color: color(light, background);
      &:hover {
        border-color: darken(color(light, danger), 10);
        box-shadow: $box-shadow-button-hover;
        transform: translateY(-1px);
      }
      &:active {
        background-color: darken(color(light, danger), 5);
        box-shadow: none;
        transform: translateY(1px);
      }
    }
  }

  .editor.dark {
    .editor-prompt {
      background-color: rgba(0,0,0,.75);
    }
    .editor-prompt__body {
      background-color: color(dark, background);
      border-color: color(dark, input-border);
    }
    .editor-prompt__title {
    }
    .editor-prompt__description {
      color: color(dark, copy);
    }
    .editor-prompt__buttons {
      background-color: color(dark, highlight);
    }
    .editor-prompt__button {
      color: #ffffff;
      &.delete {
        background-color: color(dark, danger);
        border-color: darken(color(dark, danger), 5);
        &:hover { border-color: darken(color(dark, danger), 10); }
        &:active { background-color: darken(color(dark, danger), 5); }
      }
    }
  }
</style>
