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
        <span>{{ name }}</span> –
        <span class="editor-search-result__body">{{ body }}</span>
      </span>

      <time class="editor-search-result__time">{{ dateModified | prettyDate }}</time>
    </template>
  </li>
</template>

<script>
import moment from 'moment';
import DeleteIcon from '@/assets/icons/trash.svg';
import EditIcon from '@/assets/icons/edit.svg';

export default {
  name: 'EditorSearchResult',
  components: {
    DeleteIcon,
    EditIcon,
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
  methods: {
    onBlurRename() {
      this.$emit('handleOnBlurRename');
    },
    onClickFocusRename() {
      this.newName = this.name;
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
    &.active {
      background-color: color(light, highlight);
      border-radius: 2px;
    }
    span { white-space: nowrap; }
  }
  .editor-search-result__info {
    overflow: hidden;
    text-overflow: ellipsis;
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

  .editor.dark {
    .editor-search-result.active { background-color: color(dark, highlight); }
    .editor-search-result__body { color: color(dark, copy); }
    .editor-search-result__input {
      background-color: color(dark, highlight);
      color: color(dark, font);
    }
  }
</style>
