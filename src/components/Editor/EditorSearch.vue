<template>
  <div class="editor-search">
    <EditorSearchField
      :query="query"
      @handleOnBlur="handleOnBlur"
      @handleOnFocus="handleOnFocus"
      @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
      @handleOnKeyupSearch="handleOnKeyupSearch"
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
        v-for="(note, index) in notes"
        :key="note.id"
        :active="note.id === activeNoteId"
        :body="note.body"
        :dateModified="note.date_modified"
        :id="note.id"
        :index="index"
        :name="note.name"
        :noteKey="note.key"
        :ref="`EditorSearchResult${note.id}`"
        :renaming="note.id === renamingId"
        @handleOnBlurRename="handleOnBlurRename"
        @handleOnClickFocusRename="handleOnClickFocusRename"
        @handleOnClickOpenDeletePrompt="handleOnClickOpenDeletePrompt"
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
    handleOnClickOpenDeletePrompt(noteKey) {
      this.$emit('handleOnClickOpenDeletePrompt', noteKey);
    },
    handleOnClickSelectResult(index) {
      this.$emit('handleOnClickSelectResult', index);
    },
    handleOnFocus() {
      this.isSearchFocused = true;
    },
    handleOnInputUpdateQuery(query) {
      this.$emit('handleOnInputUpdateQuery', query);
    },
    handleOnKeyupEnterRename(name) {
      this.$emit('handleOnKeyupEnterRename', name);
    },
    handleOnKeyupSearch() {
      this.$emit('handleOnKeyupSearch');
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
      bottom: .25rem;
      top: 0;
    };
    overflow-y: auto;
    padding-left: 0;
  }
</style>
