'use client';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import YearView from './components/YearView';
import LifetimeView from './components/LifetimeView';
import BirthdayInputManager from './components/BirthdayInputManager';

export default function Home() {
  const [view, setView] = useState('year');
  const [enteredDate, setEnteredDate] = useState('');
  const [startAnimation, setStartAnimation] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Load entries from localStorage on mount
    const storedEntries = JSON.parse(
      localStorage.getItem('journalEntries') || '[]'
    );
    setJournalEntries(storedEntries);
  }, []);

  const today = dayjs();

  const handleDateChange = (event) => {
    setEnteredDate(event.target.value);
  };

  const handleDateSubmit = () => {
    if (enteredDate) {
      setStartAnimation(true);
      setShowDatePicker(false);
    }
  };

  const handleUpdateDate = () => {
    setShowDatePicker(true);
    setStartAnimation(false);
  };

  const switchView = (viewName) => {
    setView(viewName);
  };

  return (
    <main className="flex flex-col items-center justify-center p-8 min-h-screen">
      <nav className="flex space-x-4 mb-4">
        <button
          onClick={() => switchView('year')}
          className={`px-4 py-2 rounded ${
            view === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Year View
        </button>
        <button
          onClick={() => switchView('lifetime')}
          className={`px-4 py-2 rounded ${
            view === 'lifetime' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Lifetime View
        </button>
      </nav>

      {/* {showDatePicker ? (
        <div className="flex flex-col space-y-4 dark:bg-white/20 border p-8 rounded-lg border-neutral-50">
          <label htmlFor="date-picker" className="text-sm dark:text-white/50">
            Enter your birthday:
          </label>
          <input
            type="date"
            id="date-picker"
            value={enteredDate}
            onChange={handleDateChange}
            className="bg-white/10 placeholder:text-neutral-100 p-2 border border-white/40 rounded-xl focus:ring-1 ring-blue-500 focus-within:bg-inherit focus-within:rounded-sm marker:bg-grey-500 before:text-white/10"
          />
          <button
            onClick={handleDateSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Enter
          </button>
        </div>
      ) : (
        <button
          onClick={handleUpdateDate}
          className="text-white px-4 py-2 rounded hover:underline-offset-4 underline-offset-1 underline transition-all"
        >
          Update Date
        </button>
      )} */}
      <BirthdayInputManager />

      {enteredDate && view === 'year' && (
        <YearView
          enteredDate={enteredDate}
          startAnimation={startAnimation}
          journalEntries={journalEntries}
        />
      )}

      {enteredDate && view === 'lifetime' && (
        <LifetimeView
          enteredDate={enteredDate}
          startAnimation={startAnimation}
          journalEntries={journalEntries}
        />
      )}
    </main>
  );
}
