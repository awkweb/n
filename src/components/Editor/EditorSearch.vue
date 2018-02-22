<template>
  <div class="editor-search">
    <EditorSearchField
      :query="query"
      @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
    />
    <EditorSearchInfo
      :note-count="notes.length"
    />
    <ul class="editor-search__results">
      <EditorSearchResult
        v-for="note in notes"
        :key="note.id"
        :active="note.id === activeNoteId"
        :body="note.body"
        :dateModified="note.date_modified"
        :id="note.id"
        :name="note.name"
        @handleOnClickSelectResult="handleOnClickSelectResult"
      />
    </ul>
  </div>
</template>

<script>
import EditorSearchField from '@/components/Editor/EditorSearchField';
import EditorSearchInfo from '@/components/Editor/EditorSearchInfo';
import EditorSearchResult from '@/components/Editor/EditorSearchResult';

export default {
  name: 'EditorSearch',
  components: {
    EditorSearchField,
    EditorSearchInfo,
    EditorSearchResult,
  },
  props: {
    activeNoteId: {
      type: Number,
      required: true,
    },
    notes: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleOnClickSelectResult(noteId) {
      this.$emit('handleOnClickSelectResult', noteId);
    },
    handleOnInputUpdateQuery(query) {
      this.$emit('handleOnInputUpdateQuery', query);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-search__results {
    height: 7rem;
    list-style-type: none;
    margin: {
      bottom: .5rem;
      top: 0;
    };
    overflow-y: auto;
    padding-left: 0;
  }
</style>
