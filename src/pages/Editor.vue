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
        :editingId="editingId"
        :notes="filteredNotes"
        :query="query"
        :renamingId="renamingId"
        @handleOnClickSelectResult="handleOnClickSelectResult"
        @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
        ref="EditorSearch"
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
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';
import keyboard from 'keyboardjs';
import EditorSearch from '@/components/Editor/EditorSearch';
import { noteMixin } from '@/mixins';

export default {
  name: 'Editor',
  mixins: [
    noteMixin,
  ],
  components: {
    EditorSearch,
  },
  computed: {
    ...mapGetters([
      'activeNote',
      'editingId',
      'notes',
      'renamingId',
      'resultIndex',
      'theme',
      'query',
      'user',
    ]),
    activeNoteId() {
      return this.activeNote ? this.activeNote.id : -1;
    },
    filteredNotes() {
      const emptyQuery = this.query.length === 0;
      const filteredNotes = emptyQuery ?
        this.notes : this.filterNotesForQuery(this.query, this.notes);
      return this.sortNotes(filteredNotes, !emptyQuery);
    },
  },
  mounted() {
    this.FETCH_USER();
  },
  created() {
    this.setUpHotKeys();
  },
  beforeDestroy() {
    keyboard.reset();
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
      'SET_RESULT_INDEX',
      'SET_USER',
    ]),
    ...mapActions([
      'FETCH_USER',
      'FETCH_USER_DATA',
      'LOG_OUT_USER',
      'RESET_ACTIVE_NOTE',
    ]),
    handleOnClickSelectResult(noteId) {
      const nextActiveNote = this.notes.find(note => note.id === noteId);
      this.SET_ACTIVE_NOTE(nextActiveNote);
    },
    handleOnInputUpdateQuery(query) {
      this.SET_QUERY(query);
      let note;
      let resultIndex;
      if (this.filteredNotes.length > 0) {
        note = this.filteredNotes[0];
        resultIndex = 0;
      } else {
        note = null;
        resultIndex = -1;
      }
      this.SET_ACTIVE_NOTE(note);
      this.SET_RESULT_INDEX(resultIndex);
    },
    onClickLogOut() {
      this
        .LOG_OUT_USER()
        .finally(() => this.$router.push({ name: 'LogIn' }));
    },
    onKeyPressEscape() {
      if (!this.editingId && !this.renamingId) {
        this.SET_QUERY('');
        this.RESET_ACTIVE_NOTE();
      }
      this
        .$refs.EditorSearch
        .$refs.EditorSearchField
        .$refs.Input
        .focus();
    },
    onKeyPressDown(event) {
      if (!this.editingId && !this.renamingId &&
        this.resultIndex !== this.filteredNotes.length - 1) {
        event.preventDefault();
        const index = this.resultIndex + 1;
        this.SET_RESULT_INDEX(index);
        const note = this.filteredNotes[index];
        this.SET_ACTIVE_NOTE(note);
        this.scrollToNoteId(note.id, true);
      }
    },
    onKeyPressUp(event) {
      if (!this.editingId && !this.renamingId && this.resultIndex > 0) {
        event.preventDefault();
        const index = this.resultIndex - 1;
        this.SET_RESULT_INDEX(index);
        const note = this.filteredNotes[index];
        this.SET_ACTIVE_NOTE(note);
        this.scrollToNoteId(note.id, false);
      }
    },
    scrollToNoteId(noteId, alignToTop) {
      const container = this
        .$refs.EditorSearch
        .$refs.EditorSearchResults;
      const containerViewTop = container.scrollTop;
      const containerViewBottom = containerViewTop + container.offsetHeight;
      const element = this
        .$refs.EditorSearch
        .$refs[`EditorSearchResult${noteId}`][0]
        .$el;
      const elementTop = element.offsetTop - ((element.clientHeight * 3.5) + 1);
      const elementBottom = elementTop + element.offsetHeight;
      const isVisible = (elementBottom <= containerViewBottom) && (elementTop >= containerViewTop);
      if (!isVisible) {
        element.scrollIntoView(alignToTop);
      }
    },
    setUpHotKeys() {
      keyboard.bind('esc', () => this.onKeyPressEscape());
      keyboard.bind('down', e => this.onKeyPressDown(e));
      keyboard.bind('up', e => this.onKeyPressUp(e));
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
