<template>
  <div
    class="editor-content"
  >
    <textarea
      v-if="activeNote"
      v-model="activeNote.body"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInputUpdateBody($event.target.value)"
      class="editor-content__textarea mousetrap"
      ref="EditorContentTextarea"
    >
    </textarea>
    <div
      v-else
      class="editor-content__placeholder"
    >
      No Note Selected
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorContent',
  props: {
    activeNote: {
      type: Object,
    },
    editingId: {
      type: Number,
    },
  },
  methods: {
    onBlur() {
      this.$emit('handleOnBlurEditorContent');
    },
    onFocus() {
      if (this.activeNote.id !== this.editingId) {
        this.$emit('handleOnFocusEditorContent', this.activeNote.id);
      }
    },
    onInputUpdateBody(body) {
      this.$emit('handleOnInputUpdateBody', body);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-content {
    max-height: 23.5rem;
    min-height: 23.5rem;
  }

  .editor-content__placeholder,
  .editor-content__textarea {
    border: {
      color: color(light, input-border);
      style: solid;
      width: 1px;
    }
    border-left: 0;
    border-right: 0;
    font: {
      family: $font-sans-serif;
      size: .9rem;
      weight: 400;
    }
    max-height: 23.5rem;
    min-height: 23.5rem;
    padding: {
      bottom: .75rem;
      top: .75rem;
    }
    transition: {
      duration: $transition-duration;
      property: border-color;
    }
    width: 100%;
  }

  .editor-content__textarea {
    background-color: transparent;
    color: color(light, font);
    outline: none;
    overflow: scroll;
    resize: none;
    &:focus { border-color: color(light, primary); }
  }

  .editor-content__placeholder {
    @include flex-row;
    @include flex-center;
  }

  .editor-content__close {
    @include flex-row;
    @include flex-center;
    @include button;
    background-color: transparent;
    border: {
      color: color(light, input-border);
      radius: 50%;
      style: solid;
      width: 1px;
    }
    height: 35px;
    left: 15px;
    padding: 0;
    position: fixed;
    top: 15px;
    width: 35px;
    &:hover {
      border-color: color(light, input-border-hover);
      .editor-content__close-icon { stroke: color(light, input-border-hover); }
    }
  }

  .editor-content__close-icon {
    stroke: color(light, input-border);
  }

  .editor.dark {
    .editor-content__placeholder,
    .editor-content__textarea {
      border-color: color(dark, input-border);
      &:focus { border-color: color(dark, primary); }
    }
    .editor-content__textarea { color: color(dark, font); }
  }
</style>
