<template>
  <div class="editor-search">
    <EditorSearchField
      :query="query"
      @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
    />
    <EditorSearchInfo
      :note-count="noteCount"
    />
    <ul class="editor-search__results">
      <EditorSearchResult
        v-for="note in notes"
        :key="note.id"
        :name="note.name"
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
    notes: {
      type: Object,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
  },
  computed: {
    noteCount() {
      return Object.keys(this.notes).length;
    },
  },
  methods: {
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
    margin: 0;
    padding-left: 0;
  }
</style>
