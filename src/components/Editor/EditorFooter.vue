<template>
  <div class="editor-footer">
    <div
      v-if="activeNote"
      class="editor-footer__details"
    >
      {{ activeNote.body | wordCount }} words ·
      {{ activeNote.body | charCount }} chars
    </div>
    <div
      v-else
      class="editor-footer__details"
    >
      This is your moment of glory.
    </div>
    <div class="editor-footer__actions">
      <template v-if="activeNote">
        <button
          class="editor-footer__button"
        >
          <DeleteIcon class="editor-footer__button-icon" />
        </button>
        <button
          class="editor-footer__button"
        >
          <EditIcon class="editor-footer__button-icon" />
        </button>
      </template>

      <button
        class="editor-footer__button"
      >
        <NewIcon class="editor-footer__button-icon" />
      </button>
      <button
        class="editor-footer__button"
      >
        <ThemeIcon class="editor-footer__button-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import DeleteIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/edit.svg';
import NewIcon from '@/assets/icons/plus.svg';
import ThemeIcon from '@/assets/icons/eye.svg';

export default {
  name: 'EditorFooter',
  components: {
    DeleteIcon,
    EditIcon,
    NewIcon,
    ThemeIcon,
  },
  props: {
    activeNote: {
      required: true,
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
    color: color(gray, copy);
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
  }
  .editor-footer__actions {
    @include flex-row;
  }
  .editor-footer__button {
    @include button;
    background-color: color(white);
    border: {
      color: color(gray);
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
      border-color: color(gray, border-hover);
      .editor-footer__button-icon { fill: color(black); }
    }
    &:last-child { margin-right: 0; }
  }
  .editor-footer__button-icon {
    fill: color(gray, copy);
    height: 25px;
    pointer-events: none;
    transition: {
      property: fill;
      duration: $transition-duration;
    }
  }
</style>
