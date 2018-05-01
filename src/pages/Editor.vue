<template>
  <div
    :class="['editor', theme]"
  >
    <template
      v-if="user && !!notes && notes.length >= 0"
    >
      <div class="editor__header">
        <div>
          <router-link
            :to="{ name: 'Settings' }"
            class="editor__header-button"
          >
            Settings
          </router-link>
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
        :notes="activeNotes"
        :query="query"
        :renamingId="renamingId"
        @handleOnBlurRename="handleOnBlurRename"
        @handleOnClickFocusRename="handleOnClickFocusRename"
        @handleOnClickSelectResult="handleOnClickSelectResult"
        @handleOnClickOpenDeletePrompt="handleOnClickOpenDeletePrompt"
        @handleOnInputUpdateQuery="handleOnInputUpdateQuery"
        @handleOnKeyupEnterRename="handleOnKeyupEnterRename"
        @handleOnKeyupSearch="handleOnKeyupSearch"
        ref="EditorSearch"
      />
      <EditorContent
        :activeNote="activeNote"
        :editingId="editingId"
        :isFullScreen="isFullScreen"
        @handleOnBlurEditorContent="handleOnBlurEditorContent"
        @handleOnFocusEditorContent="handleOnFocusEditorContent"
        @handleOnInputUpdateBody="handleOnInputUpdateBody"
        ref="EditorContent"
      />
      <EditorFooter
        :activeNote="activeNote"
        :theme="theme"
        @handleOnClickToggleFullScreen="handleOnClickToggleFullScreen"
        @handleOnClickToggleTheme="handleOnClickToggleTheme"
      />
    </template>
    <Loader
      v-else
    />
    <EditorPrompt
      v-if="deleteNoteKey"
      :loading="editorPromptLoading"
      confirmTitle="Delete"
      description="Are you sure you want to delete this note? There is no undo."
      title="Delete note"
      @handleOnClickConfirm="handleOnClickDelete"
      @handleOnClickOutside="handleOnClickOutside"
    />
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
} from 'vuex';
import Mousetrap from 'mousetrap';
import EditorContent from '@/components/Editor/EditorContent';
import EditorFooter from '@/components/Editor/EditorFooter';
import EditorPrompt from '@/components/Editor/EditorPrompt';
import EditorSearch from '@/components/Editor/EditorSearch';
import Loader from '@/components/Loader';

export default {
  name: 'Editor',
  components: {
    EditorContent,
    EditorFooter,
    EditorSearch,
    EditorPrompt,
    Loader,
  },
  data: () => ({
    deleteNoteKey: null,
    editorPromptLoading: false,
  }),
  computed: {
    ...mapGetters([
      'activeNote',
      'activeNoteId',
      'activeNotes',
      'editingId',
      'isFullScreen',
      'notes',
      'renamingId',
      'resultIndex',
      'theme',
      'query',
      'user',
    ]),
  },
  mounted() {
    this
      .FETCH_USER()
      .then(() => this.FETCH_USER_DATA());
  },
  created() {
    this.setUpHotKeys();
  },
  beforeDestroy() {
    Mousetrap.reset();
  },
  methods: {
    ...mapMutations([
      'SET_ACTIVE_NOTE',
      'SET_EDITING_ID',
      'SET_QUERY',
      'SET_RENAMING_ID',
      'SET_RESULT_INDEX',
      'SET_USER',
      'TOGGLE_FULL_SCREEN',
    ]),
    ...mapActions([
      'CREATE_NOTE',
      'DELETE_NOTE',
      'FETCH_USER',
      'FETCH_USER_DATA',
      'LOG_OUT_USER',
      'RESET_ACTIVE_NOTE',
      'UPDATE_NOTE_BODY',
      'UPDATE_NOTE_NAME',
      'UPDATE_THEME',
    ]),
    createNote() {
      this.CREATE_NOTE();
      this.handleOnKeyupSearch();
    },
    handleOnBlurEditorContent() {
      this.SET_EDITING_ID(null);
    },
    handleOnBlurRename() {
      this.SET_RENAMING_ID(null);
      this
        .$refs.EditorSearch
        .$refs.EditorSearchField
        .$refs.Input
        .focus();
    },
    handleOnClickDelete() {
      this.editorPromptLoading = true;
      this
        .DELETE_NOTE(this.deleteNoteKey)
        .then(() => {
          this.editorPromptLoading = false;
          this.deleteNoteKey = null;
        })
        .catch(() => {
          this.editorPromptLoading = false;
        });
    },
    handleOnClickFocusRename(noteId) {
      this.SET_RENAMING_ID(noteId);
    },
    handleOnClickSelectResult(index) {
      const nextActiveNote = this.activeNotes[index];
      this.SET_RESULT_INDEX(index);
      this.SET_ACTIVE_NOTE(nextActiveNote);
    },
    handleOnClickOpenDeletePrompt(noteKey) {
      this.deleteNoteKey = noteKey;
    },
    handleOnClickOutside() {
      this.deleteNoteKey = null;
    },
    handleOnClickToggleFullScreen() {
      this.TOGGLE_FULL_SCREEN();
    },
    handleOnClickToggleTheme() {
      const nextTheme = this.theme === 'light' ? 'dark' : 'light';
      this.UPDATE_THEME(nextTheme);
    },
    handleOnFocusEditorContent(editingId) {
      this.SET_EDITING_ID(editingId);
    },
    handleOnInputUpdateBody(body) {
      this.UPDATE_NOTE_BODY(body);
    },
    handleOnInputUpdateQuery(query) {
      this.SET_QUERY(query);
      let note;
      let resultIndex;
      if (this.activeNotes.length > 0) {
        note = this.activeNotes[0];
        resultIndex = 0;
      } else {
        note = null;
        resultIndex = -1;
      }
      this.SET_ACTIVE_NOTE(note);
      this.SET_RESULT_INDEX(resultIndex);
    },
    handleOnKeyupEnterRename(name) {
      this
        .UPDATE_NOTE_NAME(name)
        .then(() => this.handleOnBlurRename());
    },
    handleOnKeyupSearch() {
      if (this.activeNote) {
        this
          .$refs.EditorContent
          .$refs.EditorContentTextarea
          .focus();
      }
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
        this.resultIndex !== this.activeNotes.length - 1) {
        event.preventDefault();
        const index = this.resultIndex + 1;
        const note = this.activeNotes[index];
        this.SET_RESULT_INDEX(index);
        this.SET_ACTIVE_NOTE(note);
        this.scrollToNoteId(note.id, true);
      }
    },
    onKeyPressUp(event) {
      if (!this.editingId && !this.renamingId && this.resultIndex > 0) {
        event.preventDefault();
        const index = this.resultIndex - 1;
        const note = this.activeNotes[index];
        this.SET_RESULT_INDEX(index);
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
      const elementTop = element.offsetTop - ((element.clientHeight * 3.45) + 1);
      const elementBottom = elementTop + element.offsetHeight;
      const isVisible = (elementBottom <= containerViewBottom) && (elementTop >= containerViewTop);
      if (!isVisible) {
        element.scrollIntoView(alignToTop);
      }
    },
    setUpHotKeys() {
      Mousetrap.prototype.stopCallback = (e, element, combo) => {
        if ((`${element.className}`).indexOf('mousetrap') > -1 ||
          (combo === 'mod+enter' && this.editingId)) {
          return false;
        }
        return element.tagName === 'INPUT' ||
          element.tagName === 'SELECT' ||
          element.tagName === 'TEXTAREA';
      };
      Mousetrap.bind('tab', () => setTimeout(() => this.handleOnKeyupSearch(), 0));
      Mousetrap.bind('esc', () => this.onKeyPressEscape());
      Mousetrap.bind('down', e => this.onKeyPressDown(e));
      Mousetrap.bind('up', e => this.onKeyPressUp(e));
      Mousetrap.bind('mod+enter', () => this.createNote());
      Mousetrap.bind('mod+d', (e) => {
        e.preventDefault();
        if (this.activeNote) {
          this.deleteNoteKey = this.activeNote.key;
        }
      });
      Mousetrap.bind('mod+e', (e) => {
        e.preventDefault();
        if (this.activeNote) {
          this.handleOnClickFocusRename(this.activeNote.id);
        }
      });
      Mousetrap.bind('mod+.', () => this.handleOnClickToggleTheme());
      Mousetrap.bind('mod+/', () => {
        if (this.activeNote) {
          this.TOGGLE_FULL_SCREEN();
        }
      });
    },
  },
  metaInfo() {
    return {
      title: this.activeNote ? this.activeNote.name : 'App',
      bodyAttrs: {
        class: this.theme,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';
  .editor {
    margin: {
      left: auto;
      right: auto;
    }
    max-width: 34rem;
    min-height: 100vh;
    padding: {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      top: .5rem;
    }
    position: relative;
  }
  .editor__header {
    @include flex-row;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: .25rem;
  }
  .editor__header-button {
    @include button;
    background-color: transparent;
    border: 0;
    color: color(light, copy-light);
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
    text-decoration: none;
    &:hover { color: color(light, primary); }
    &:last-child { margin-right: 0; }
  }
  .editor.dark {
    .editor__header-button{
      color: color(dark, copy);
      &:hover { color: color(dark, primary); }
    }
  }
</style>
