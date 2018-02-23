<template>
  <div class="editor-search-info">
    <div class="editor-search-info__note-count">
      <span class="mono">{{ resultCount }}</span> {{ resultCount > 1 ? 'notes' : 'note' }}
    </div>

    <div class="editor-search-info__help">
      <template v-if="editing || !searching">
        <span class="mono">Esc</span> to focus search
      </template>
      <template v-else-if="renaming">
        <span class="mono">Enter</span> to save title
      </template>
      <template v-else-if="queryLength > 0">
        <span class="mono">Ctrl</span> + <span class="mono">Enter</span> to create note
      </template>
      <template v-else-if="selected">
        <span class="mono">Enter</span> to edit note
      </template>
      <template v-else>
        Type to search
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorSearchInfo',
  props: {
    editing: {
      type: Boolean,
      required: true,
    },
    queryLength: {
      type: Number,
      required: true,
    },
    renaming: {
      type: Boolean,
      required: true,
    },
    resultCount: {
      type: Number,
      required: true,
    },
    searching: {
      type: Boolean,
      required: true,
    },
    selected: {
      type: Boolean,
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
    color: color(gray, copy);
    font-size: .7rem;
    justify-content: space-between;
    padding: {
      bottom: .25rem;
      left: .35rem;
      top: .35rem;
      right: .35rem;
    }
  }
  .editor-search-info__help {
    .mono {
      background-color: color(gray, highlight);
      color: color(black);
    }
  }
  .mono {
    font: {
      family: $font-mono;
      size: .65rem;
    }
  }
</style>
