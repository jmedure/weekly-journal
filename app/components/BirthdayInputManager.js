// components/BirthdayInputManager.js
'use client';

import React, { useState, useEffect } from 'react';

const BirthdayInputManager = () => {
  const [birthday, setBirthday] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'green';
    toast.style.color = 'white';
    toast.style.padding = '10px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  }

  useEffect(() => {
    const storedBirthday = localStorage.getItem('userBirthday');
    if (storedBirthday) {
      setBirthday(storedBirthday);
    }
  }, []);

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
    if (error) setError('');
  };

  const validateAndSaveBirthday = () => {
    const date = new Date(birthday);
    const now = new Date();
    if (date > now) {
      setError('Birthday cannot be in the future.');
      return;
    }
    localStorage.setItem('userBirthday', birthday);
    setIsEditing(false);
    showToast('Updated ✔');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not set'; // Return if the date string is empty

    // Split the date string and create a new date object as UTC
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));

    if (isNaN(date.getTime())) {
      return 'Invalid date'; // Check if the date object is valid
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  };

  return (
    <div className="bg-white/10 p-8 flex flex-col space-y-4 rounded-lg transition-all">
      {isEditing ? (
        <>
          <label htmlFor="birthday">Enter your birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={handleBirthdayChange}
            className="dark:bg-white/10 border focus:bg-white/20 selection:text-white border-white/10 p-3 rounded-xl"
          />
          <button
            onClick={validateAndSaveBirthday}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Enter
          </button>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </>
      ) : (
        <div className="flex space-x-2">
          <p>Birthday:</p>
          <p
            className="underline cursor-pointer text-white/50"
            onClick={handleEditClick}
          >
            {formatDate(birthday)}
          </p>
        </div>
      )}
    </div>
  );
};

export default BirthdayInputManager;
