<template>
  <div class="editor-search">
    <EditorSearchField
      :query="query"
      @handleOnBlur="handleOnBlur"
      @handleOnFocus="handleOnFocus"
      @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
      ref="EditorSearchField"
    />
    <EditorSearchInfo
      :editing="editingId !== null"
      :renaming="renamingId !== null"
      :resultCount="notes.length"
      :searching="isSearchFocused"
      :selected="activeNoteId !== -1"
      :queryLength="query.length"
    />
    <ul
      class="editor-search__results"
      ref="EditorSearchResults"
    >
      <EditorSearchResult
        v-for="note in notes"
        :key="note.id"
        :active="note.id === activeNoteId"
        :body="note.body"
        :dateModified="note.date_modified"
        :id="note.id"
        :name="note.name"
        :ref="`EditorSearchResult${note.id}`"
        :renaming="note.id === renamingId"
        @handleOnBlurRename="handleOnBlurRename"
        @handleOnClickFocusRename="handleOnClickFocusRename"
        @handleOnClickSelectResult="handleOnClickSelectResult"
        @handleOnKeyupEnterRename="handleOnKeyupEnterRename"
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
    editingId: {
      type: Number,
    },
    notes: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    renamingId: {
      type: Number,
    },
  },
  data: () => ({
    isSearchFocused: true,
  }),
  methods: {
    handleOnBlur() {
      this.isSearchFocused = false;
    },
    handleOnBlurRename() {
      this.$emit('handleOnBlurRename');
    },
    handleOnClickFocusRename(noteId) {
      this.$emit('handleOnClickFocusRename', noteId);
    },
    handleOnClickSelectResult(noteId) {
      this.$emit('handleOnClickSelectResult', noteId);
    },
    handleOnFocus() {
      this.isSearchFocused = true;
    },
    handleOnInputUpdateQuery(query) {
      this.$emit('handleOnInputUpdateQuery', query);
    },
    handleOnKeyupEnterRename(newName) {
      this.$emit('handleOnKeyupEnterRename', newName);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .editor-search__results {
    height: 9rem;
    list-style-type: none;
    margin: {
      bottom: .5rem;
      top: 0;
    };
    overflow-y: auto;
    padding-left: 0;
  }
</style>
