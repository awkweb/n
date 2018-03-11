<template>
  <div class="editor-search-field">
    <input
      v-focus
      v-bind:value="query"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInputUpdateQuery($event.target.value)"
      @keyup.enter="onKeyupSearch"
      autofocus
      class="editor-search-field__input mousetrap"
      placeholder="Search or create"
      ref="Input"
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
  methods: {
    onBlur() {
      this.$emit('handleOnBlur');
    },
    onFocus() {
      this.$emit('handleOnFocus');
    },
    onInputUpdateQuery(query) {
      this.$emit('handleOnInputUpdateQuery', query);
    },
    onKeyupSearch() {
      this.$emit('handleOnKeyupSearch');
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
    background-color: transparent;
    border: {
      color: color(light, input-border);
      radius: 2px;
      style: solid;
      width: 1px;
    }
    box-shadow: $box-shadow;
    color: color(light, font);
    font: {
      family: $font-sans-serif;
      size: .9rem;
      weight: 400;
    }
    height: 2.5rem;
    outline: none;
    padding: {
      left: .65rem;
      right: .65rem;
    }
    transition: {
      property: border-color, color;
      duration: $transition-duration;
    }
    width: 100%;
    &:hover { border-color: color(light, input-border-hover); }
    &:focus { border-color: color(light, primary); }
    &::-webkit-input-placeholder { color: color(light, copy); }
  }
  .editor-search-field__icon {
    fill: color(light, font);
    height: 25px;
    pointer-events: none;
    position: absolute;
    right: .55rem;
    top: .55rem;
    transition: {
      duration: $transition-duration;
      property: fill;
    }
  }

  .editor.dark {
    .editor-search-field__input {
      border-color: color(dark, input-border);
      color: color(dark, font);
      &:hover { border-color: color(dark, input-border-hover); }
      &:focus { border-color: color(dark, primary); }
      &::-webkit-input-placeholder { color: color(dark, copy); }
    }
    .editor-search-field__icon { fill: color(dark, font); }
  }
</style>
