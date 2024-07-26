// app/utils/journalStorage.js
export const getJournalEntry = (week) => {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '{}');
  return entries[week] || '';
};

export const saveJournalEntry = (week, content) => {
  const entries = JSON.parse(localStorage.getItem('journalEntries') || '{}');
  entries[week] = content;
  localStorage.setItem('journalEntries', JSON.stringify(entries));
};
