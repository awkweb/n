<template>
  <div
    v-if="user"
    class="editor"
  >
    <div
      class="editor__container"
    >
      <div class="editor__header">
        <div>
          <button
            class="editor__header-button"
          >
            Settings
          </button>
          <button
            @click="onClickLogOut"
            class="editor__header-button"
          >
            Sign Out
          </button>
        </div>
      </div>
      <EditorSearch
        :activeNoteId="activeNoteId"
        :editingId="editingId"
        :notes="filteredNotes"
        :query="query"
        :renamingId="renamingId"
        @handleOnBlurRename="handleOnBlurRename"
        @handleOnClickFocusRename="handleOnClickFocusRename"
        @handleOnClickSelectResult="handleOnClickSelectResult"
        @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
        @handleOnKeyupEnterRename="handleOnKeyupEnterRename"
        ref="EditorSearch"
      />
      <div
        v-if="activeNote"
        v-html="activeNote.body"
        class="editor__body"
      >
      </div>
      <div
        v-else
        class="editor__body"
      >
      </div>
      <EditorFooter
        :activeNote="activeNote"
      />
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
import EditorFooter from '@/components/Editor/EditorFooter';
import EditorSearch from '@/components/Editor/EditorSearch';
import { noteMixin } from '@/mixins';

export default {
  name: 'Editor',
  mixins: [
    noteMixin,
  ],
  components: {
    EditorFooter,
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
      'SET_RENAMING_ID',
      'SET_RESULT_INDEX',
      'SET_USER',
    ]),
    ...mapActions([
      'FETCH_USER',
      'FETCH_USER_DATA',
      'LOG_OUT_USER',
      'RESET_ACTIVE_NOTE',
      'UPDATE_NOTE',
    ]),
    handleOnBlurRename() {
      this.SET_RENAMING_ID(null);
      this
        .$refs.EditorSearch
        .$refs.EditorSearchField
        .$refs.Input
        .focus();
    },
    handleOnClickFocusRename(noteId) {
      this.SET_RENAMING_ID(noteId);
    },
    handleOnClickSelectResult(index) {
      const nextActiveNote = this.notes[index];
      this.SET_ACTIVE_NOTE(nextActiveNote);
      this.SET_RESULT_INDEX(index);
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
    handleOnKeyupEnterRename(newName) {
      const newNote = Object.assign(this.activeNote, { name: newName });
      this
        .UPDATE_NOTE(newNote)
        .then(() => this.handleOnBlurRename());
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
      const elementTop = element.offsetTop - ((element.clientHeight * 3.75) + 1);
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
      top: .5rem;
    }
  }
  .editor__header {
    @include flex-row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: .25rem;
    opacity: .35;
    transition: {
      property: opacity;
      duration: $transition-duration;
    }
    &:hover { opacity: 1; }
  }
  .editor__header-button {
    @include button;
    border: 0;
    color: color(gray, copy);
    font: {
      family: $font-sans-serif;
      size: .7rem;
    }
    margin-right: .25rem;
    padding: 0;
    transition: {
      property: color;
      duration: $transition-duration;
    }
    &:hover { color: color(orange); }
    &:last-child { margin-right: 0; }
  }
  .editor__body {
    background-color: color(white);
    border: {
      color: color(gray);
      style: solid;
      width: 1px;
    }
    border-left: 0;
    border-right: 0;
    font: {
      family: $font-sans-serif;
      size: .9rem;
      weight: 400;
    }
    max-height: 20rem;
    min-height: 20rem;
    overflow: scroll;
    padding: {
      bottom: .75rem;
      left: .5rem;
      right: .5rem;
      top: .5rem;
    }
    width: 100%;
    word-wrap: break-word;
  }
</style>
