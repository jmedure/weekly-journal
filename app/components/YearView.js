// app/components/YearView.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const YearView = ({ journalEntries }) => {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    // Fetch the birthdate from localStorage
    const storedBirthDate = localStorage.getItem('userBirthday');
    if (storedBirthDate) {
      setBirthDate(storedBirthDate);
    }
  }, []);

  const currentDate = dayjs();
  const startOfYear = dayjs().startOf('year');
  const birthDay = dayjs(birthDate);
  const totalWeeksSinceBirth = birthDate
    ? currentDate.diff(birthDay, 'week')
    : 0;
  const currentWeekOfYear = currentDate.diff(startOfYear, 'week');

  const handleClick = (index) => {
    const weekOfLife = totalWeeksSinceBirth - (currentWeekOfYear - index);
    if (index <= currentWeekOfYear) {
      router.push(`/journal/${weekOfLife}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 52 }).map((_, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-8 w-8 h-8 flex justify-center items-center rounded-xl border-2 ${
            index <= currentWeekOfYear
              ? 'bg-blue-500 cursor-pointer'
              : 'border border-white/20 cursor-not-allowed'
          } ${index === currentWeekOfYear ? 'bg-orange-500' : ''}
          `}
          onClick={() => handleClick(index)}
        >
          <span className="text-xs text-white">{index + 1}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default YearView;
