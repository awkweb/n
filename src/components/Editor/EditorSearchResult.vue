<template>
  <li
    :class="{ active }"
    @click.capture="onClickSelectResult"
    @dblclick="onClickFocusRename"
    class="editor-search-result"
  >
    <input
      v-if="renaming"
      v-focus
      v-model="newName"
      @blur="onBlurRename"
      @keyup.enter="onKeyupEnterRename"
      @keyup.esc="onBlurRename"
      class="editor-search-result__input"
      ref="Input"
      spellcheck="false"
      type="text"
    >
    <template v-if="!renaming">
      <span class="editor-search-result__info">
        <span class="editor-search-result__name">{{ name }}</span>
        –
        <span class="editor-search-result__body">{{ body }}</span>
      </span>

      <time class="editor-search-result__time">{{ dateModified | prettyDate }}</time>
      <div class="editor-search-result__actions">
        <button
          @click.stop="onClickFocusRename"
          class="editor-search-result__action"
        >
          <RenameIcon class="editor-search-result__action-icon" />
        </button>
        <button
          @click="onClickDelete"
          class="editor-search-result__action delete"
        >
          <DeleteIcon class="editor-search-result__action-icon" />
        </button>
      </div>
    </template>
  </li>
</template>

<script>
import moment from 'moment';
import DeleteIcon from '@/assets/icons/trash.svg';
import RenameIcon from '@/assets/icons/pencil.svg';

export default {
  name: 'EditorSearchResult',
  components: {
    DeleteIcon,
    RenameIcon,
  },
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    noteKey: {
      type: String,
      required: true,
    },
    dateModified: {
      type: String,
      required: true,
    },
    renaming: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    newName: null,
  }),
  beforeUpdate() {
    if (this.renaming && !this.newName) {
      this.newName = this.name;
    }
  },
  methods: {
    onBlurRename() {
      this.$emit('handleOnBlurRename');
    },
    onClickDelete() {
      this.$emit('handleOnClickOpenDeletePrompt', this.noteKey);
    },
    onClickFocusRename() {
      this.newName = null;
      this.$emit('handleOnClickFocusRename', this.id);
    },
    onClickSelectResult() {
      this.$emit('handleOnClickSelectResult', this.index);
    },
    onKeyupEnterRename() {
      if (this.newName !== this.name) {
        this.$emit('handleOnKeyupEnterRename', this.newName);
      } else {
        this.$emit('handleOnBlurRename');
      }
    },
  },
  filters: {
    prettyDate: dateModified => moment
      .parseZone(dateModified, 'ddd MMM DD YYYY HH:mm:ss ZZ')
      .local()
      .fromNow(),
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-search-result {
    @include flex-row;
    align-items: center;
    cursor: pointer;
    font-size: .85rem;
    height: 32px;
    justify-content: space-between;
    padding: {
      left: .35rem;
      right: .35rem;
    }
    position: relative;
    &:hover {
      .editor-search-result__actions {
        @include flex-row;
        @include flex-center;
      }
    }
    &.active {
      background-color: color(light, highlight);
      border-radius: 2px;
      .editor-search-result__actions { background-color: color(light, highlight); }
    }
    span { white-space: nowrap; }
  }
  .editor-search-result__info {
    color: color(light, copy);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editor-search-result__name {
    color: color(light, font);
  }
  .editor-search-result__body {
    color: color(light, copy);
  }
  .editor-search-result__time {
    padding-left: .35rem;
    white-space: nowrap;
  }
  .editor-search-result__input {
    -webkit-appearance: none;
    background-color: color(light, highlight);
    border: 0;
    color: color(light, font);
    flex: 1;
    font: {
      family: $font-sans-serif;
      size: .85rem;
    }
    outline: 0;
    padding: 0;
  }
  .editor-search-result__actions {
    background-color: color(light, background);
    display: none;
    padding-left: .25rem;
    position: absolute;
    right: .25rem;
  }
  .editor-search-result__action {
    @include button;
    background-color: color(light, background);
    border: {
      color: color(light, input-border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    font: {
      size: .65rem;
      weight: 500;
    }
    height: 24px;
    padding: {
      bottom: 0;
      left: .5rem;
      right: .5rem;
      top: 0;
    }
    transition: {
      property: border-color;
      duration: $transition-duration;
    }
    &:hover { border-color: color(light, input-border-hover); }
    &:first-child { margin-right: .25rem; }
    &.delete { color: color(light, danger); }
  }
  .editor-search-result__action-icon {
    height: 20px;
    pointer-events: none;
    stroke: color(light, copy);
    transition: {
      property: fill;
      duration: $transition-duration;
    }
  }

  .editor.dark {
    .editor-search-result__info { color: color(dark, copy); }
    .editor-search-result.active {
      background-color: color(dark, highlight);
      .editor-search-result__actions { background-color: color(dark, highlight); }
    }
    .editor-search-result__name { color: color(dark, font); }
    .editor-search-result__body { color: color(dark, copy); }
    .editor-search-result__input {
      background-color: color(dark, highlight);
      color: color(dark, font);
    }
    .editor-search-result__actions {
      background-color: color(dark, background);
    }
    .editor-search-result__action {
      background-color: color(dark, background);
      border-color: color(dark, input-border);
      color: color(dark, font);
      &.delete { color: color(dark, danger); }
    }
  }
</style>
