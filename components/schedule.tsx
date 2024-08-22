import React from 'react';

const Scheduler = () => {
  const events = [
    { time: "09:30", title: "Practical Task Review", role: "UI/UX Designer", date: "Wednesday, 06 July 2023" },
    { time: "12:00", title: "Resume Review", role: "Magento Developer", date: "Wednesday, 06 July 2023" },
    { time: "01:30", title: "Final HR Round", role: "Sales Manager", date: "Wednesday, 06 July 2023" },
    { time: "09:30", title: "Practical Task Review", role: "Front end Developer", date: "Thursday, 07 July 2023" },
    { time: "11:00", title: "TL Meeting", role: "React JS", date: "Thursday, 07 July 2023" },
  ];

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Schedule</h2>
        <button className="bg-purple-500 text-white p-2 rounded-full">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button className="text-purple-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-medium">July, 2023</span>
        <button className="text-purple-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-4 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
          <span key={day} className="text-xs text-gray-500">{day}</span>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <button key={i} className={`p-2 rounded-full ${i + 1 === 6 ? 'bg-purple-500 text-white' : ''}`}>
            {i + 1}
          </button>
        ))}
      </div>

      {events.map((event, index) => (
        <div key={index} className="mt-4 border-l-4 border-purple-500 pl-2">
          <div className="text-sm text-gray-500">{event.date}</div>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-semibold">{event.time}</div>
              <div className="text-sm">{event.role}</div>
              <div className="font-medium">{event.title}</div>
            </div>
            <button className="text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
