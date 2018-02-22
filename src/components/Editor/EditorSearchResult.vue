<template>
  <li
    :class="{ active }"
    @click.capture="onClickSelectResult"
    class="editor-search-result"
  >
    <span class="editor-search-result__info">
      <span>{{ name }}</span> –
      <span class="editor-search-result__body">{{ body }}</span>
    </span>

    <span>{{ dateModified | prettyDate }}</span>
  </li>
</template>

<script>
import moment from 'moment';

export default {
  name: 'EditorSearchResult',
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
    name: {
      type: String,
      required: true,
    },
    dateModified: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickSelectResult() {
      this.$emit('handleOnClickSelectResult', this.id);
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
    height: 1.7rem;
    justify-content: space-between;
    padding: {
      left: .5rem;
      right: .5rem;
    }
    &.active { background-color: color(gray, highlight); }
    span { white-space: nowrap; }
  }
  .editor-search-result__info {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editor-search-result__body {
    color: color(gray, copy);
  }
</style>
