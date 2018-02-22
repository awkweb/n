<template>
  <div
    v-if="user"
    class="editor"
  >
    <div
      class="editor__container"
    >
      <EditorSearch
        :activeNoteId="activeNoteId"
        :notes="notes"
        :query="query"
        @handleOnClickSelectResult="handleOnClickSelectResult"
        @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
      />
      <button
        @click="onClickLogOut"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
import EditorSearch from '@/components/Editor/EditorSearch';
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';

export default {
  name: 'Editor',
  components: {
    EditorSearch,
  },
  computed: {
    ...mapGetters([
      'activeNote',
      'notes',
      'theme',
      'query',
      'user',
    ]),
    activeNoteId() {
      return this.activeNote ? this.activeNote.id : -1;
    },
  },
  mounted() {
    this.FETCH_USER();
  },
  watch: {
    user(newUser) {
      if (newUser) this.FETCH_USER_DATA();
    },
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_NOTE',
      'SET_QUERY',
      'SET_USER',
    ]),
    ...mapActions([
      'FETCH_USER',
      'LOG_OUT_USER',
      'FETCH_USER_DATA',
    ]),
    handleOnClickSelectResult(noteId) {
      const nextActiveNote = this.notes.find(note => note.id === noteId);
      this.SET_ACTIVE_NOTE(nextActiveNote);
    },
    handleOnInputUpdateQuery(query) {
      this.SET_QUERY(query);
    },
    onClickLogOut() {
      this
        .LOG_OUT_USER()
        .finally(() => this.$router.push({ name: 'LogIn' }));
    },
  },
  metaInfo: {
    title: 'App',
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
  .editor {
  }
  .editor__container {
    margin: {
      left: auto;
      right: auto;
    }
    max-width: 33rem;
    padding: {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      top: 2rem;
    }
  }
</style>
