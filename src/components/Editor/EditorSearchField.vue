<template>
  <div class="editor-search-field">
    <input
      v-focus
      v-bind:value="query"
      @blur="isSearchFocused = false"
      @focus="isSearchFocused = true"
      @input="onInputUpdateQuery($event.target.value)"
      @keyup.enter="onKeyupSearch"
      autofocus
      class="editor-search-field__input"
      placeholder="Search or create"
      ref="input"
      spellcheck="false"
      type="text"
    >
    <SearchIcon
      class="editor-search-field__icon"
    />
  </div>
</template>

<script>
import SearchIcon from '@/assets/icons/search.svg';

export default {
  name: 'EditorSearchField',
  components: {
    SearchIcon,
  },
  props: {
    query: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isSearchFocused: true,
  }),
  methods: {
    onInputUpdateQuery(query) {
      this.$emit('handleOnInputUpdateQuery', query);
    },
    onKeyupSearch() {
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-search-field {
    position: relative;
  }
  .editor-search-field__input {
    background-color: color(white);
    border: {
      color: color(gray, border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    box-shadow: $box-shadow;
    font: {
      family: $font-sans-serif;
      size: .9rem;
      weight: 400;
    }
    height: 2.5rem;
    outline: none;
    padding: {
      left: .75rem;
      right: .75rem;
    }
    transition: {
      property: border-color;
      duration: $transition-duration;
    }
    width: 100%;
    &:hover { border-color: color(gray, border-hover); }
    &:focus { border-color: color(orange); }
    &::-webkit-input-placeholder { color: color(gray, copy); }
  }
  .editor-search-field__icon {
    height: 25px;
    position: absolute;
    right: .55rem;
    top: .55rem;
  }
</style>
