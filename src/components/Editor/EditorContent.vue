<template>
  <div>
    <div
      v-if="activeNote"
      v-html="activeNote.body"
      @input="onInputUpdateBody($event.target)"
      class="editor__content"
      contenteditable="true"
    >
    </div>
    <div
      v-else
      class="editor__content"
    >
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
  },
  methods: {
    onInputUpdateBody(body) {
      console.log(body);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor__content {
    background-color: transparent;
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
    outline: none;
    overflow: scroll;
    padding: {
      bottom: .75rem;
      left: .5rem;
      right: .5rem;
      top: .75rem;
    }
    transition: {
      duration: $transition-duration;
      property: border-color;
    }
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
    &:focus { border-color: color(light, primary); }
  }
  .editor.dark {
    .editor__content {
      border-color: color(dark, input-border);
      &:focus { border-color: color(dark, primary); }
    }
  }
</style>
