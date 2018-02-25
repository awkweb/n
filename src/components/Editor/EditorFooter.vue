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
      delete, rename, new, toggle theme
    </div>
  </div>
</template>

<script>
import EditorSearchField from '@/components/Editor/EditorSearchField';
import EditorSearchInfo from '@/components/Editor/EditorSearchInfo';
import EditorSearchResult from '@/components/Editor/EditorSearchResult';

export default {
  name: 'EditorFooter',
  components: {
    EditorSearchField,
    EditorSearchInfo,
    EditorSearchResult,
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
</style>
