import 'string_score';
import moment from 'moment';

const secondsFromNow = (now, dateString) =>
  now.diff(moment(dateString, 'ddd MMM DD YYYY HH:mm:ss ZZ'), 'seconds');

// eslint-disable-next-line import/prefer-default-export
export const noteMixin = {
  methods: {
    filterNotesForQuery: (query, notes) => notes
      .map((note) => {
        const queryLower = query.toLowerCase();
        const nameScore = note.name.toLowerCase().score(queryLower);
        const bodyScore = note.body.toLowerCase().score(queryLower);
        return {
          ...note,
          score: {
            body: bodyScore,
            name: nameScore,
            total: bodyScore + nameScore,
          },
        };
      })
      .filter(note => note.score.name > 0 || note.score.body > 0),
    sortNotes(notes, useScore) {
      const now = moment();
      let sortedNotes;
      if (useScore) {
        sortedNotes = notes
          .sort((a, b) => b.score.total - a.score.total);
      } else {
        sortedNotes = notes
          .sort((a, b) =>
            secondsFromNow(now, a.date_modified) - secondsFromNow(now, b.date_modified));
      }
      return sortedNotes;
    },
  },
};
