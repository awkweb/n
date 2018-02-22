<template>
  <div class="editor-search-info">
    <div class="editor-search-info__note-count">
      {{ noteCount }} {{ noteCount > 1 ? 'notes' : 'note' }}
    </div>

    <div class="editor-search-info__help">
      Type to search
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorSearchInfo',
  props: {
    noteCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-search-info {
    @include flex-row;
    justify-content: space-between;
    padding: {
      left: .5rem;
      top: .35rem;
      right: .5rem;
    }
  }
  .editor-search-info__note-count,
  .editor-search-info__help {
    color: color(gray, copy);
    font-size: .7rem;
  }
</style>
