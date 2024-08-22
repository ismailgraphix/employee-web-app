"use client"

import React, { useState } from 'react';

const MySchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">My Schedule</h2>
      <div className="mb-4">
        {/* Calendar */}
        <div className="flex items-center justify-between mb-2">
          <button>◄</button>
          <p className="text-lg font-bold">July, 2023</p>
          <button>►</button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {Array.from({ length: 31 }, (_, i) => (
            <div
              key={i}
              onClick={() => handleDateClick(new Date(2023, 6, i + 1))}
              className={`p-2 rounded-md ${
                selectedDate.getDate() === i + 1
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Details */}
      <div>
        <p className="text-lg font-bold">Wednesday, 06 July 2023</p>
        <ul className="space-y-2 mt-2">
          <li>
            <p className="font-bold">09:30</p>
            <p className="text-sm">UI/UX Designer</p>
            <p>Practical Task Review</p>
          </li>
          <li>
            <p className="font-bold">12:00</p>
            <p className="text-sm">Magento Developer</p>
            <p>Resume Review</p>
          </li>
          <li>
            <p className="font-bold">01:30</p>
            <p className="text-sm">Sales Manager</p>
            <p>Final HR Round</p>
          </li>
        </ul>

        <p className="text-lg font-bold mt-6">Thursday, 07 July 2023</p>
        <ul className="space-y-2 mt-2">
          <li>
            <p className="font-bold">09:30</p>
            <p className="text-sm">Front end Developer</p>
            <p>Practical Task Review</p>
          </li>
          <li>
            <p className="font-bold">11:00</p>
            <p className="text-sm">React JS</p>
            <p>TL Meeting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MySchedule;
