// app/journal/[week]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' is correct for App Router
import {
  getJournalEntry,
  saveJournalEntry,
} from '../../../utils/journalStorage'; // Adjust the path as necessary

const JournalEntryPage = () => {
  const { query } = useRouter();
  const [entry, setEntry] = useState('');
  const week = query.week; // Make sure 'week' is the dynamic parameter you use in the URL

  useEffect(() => {
    const loadedEntry = getJournalEntry(week);
    if (loadedEntry) {
      setEntry(loadedEntry);
    }
  }, [week]);

  const handleSave = () => {
    saveJournalEntry(week, entry);
  };

  return (
    <div>
      <h1>Journal Entry for Week: {week}</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="w-full h-64 border p-2"
      />
      <button
        onClick={handleSave}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </div>
  );
};

export default JournalEntryPage;
