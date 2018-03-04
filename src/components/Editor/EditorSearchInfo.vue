<template>
  <div class="editor-search-info">
    <div class="editor-search-info__note-count">
      <span class="mono">{{ resultCount }}</span> {{ resultCount > 1 ? 'notes' : 'note' }}
    </div>

    <div class="editor-search-info__help">
      <template v-if="renaming">
        <span class="mono">Enter</span> to save name
      </template>
      <template v-else-if="editing || !searching">
        <span class="mono">Esc</span> to focus search
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
      required: true,
      type: Boolean,
    },
    queryLength: {
      required: true,
      type: Number,
    },
    renaming: {
      required: true,
      type: Boolean,
    },
    resultCount: {
      required: true,
      type: Number,
    },
    searching: {
      required: true,
      type: Boolean,
    },
    selected: {
      required: true,
      type: Boolean,
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
    color: color(light, copy);
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
      background-color: color(light, highlight);
      color: color(light, font);
    }
  }
  .mono {
    font: {
      family: $font-mono;
      size: .65rem;
    }
  }

  .editor.dark {
    .editor-search-info { color: color(dark, copy); }
    .editor-search-info__help {
      .mono {
        background-color: color(dark, highlight);
        color: color(dark, font);
      }
    }
  }
</style>
