<template>
  <li class="editor-search-result">
    <span>{{ name }}</span>
  </li>
</template>

<script>
export default {
  name: 'EditorSearchResult',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
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
    height: 1.7rem;
    list-style-type: none;
    padding: {
      left: .5rem;
      right: .5rem;
    }
  }
</style>
