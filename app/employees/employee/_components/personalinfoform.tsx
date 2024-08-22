"use client"

import React from 'react';

const PersonalInfoForm = () => {
  return (
    <div className='p-6 border rounded-lg bg-white'>  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="First Name" className="border p-3 rounded-md" />
      <input type="text" placeholder="Last Name" className="border p-3 rounded-md" />
      <input type="text" placeholder="Mobile Number" className="border p-3 rounded-md" />
      <input type="email" placeholder="Email Address" className="border p-3 rounded-md" />
      <input type="date" className="border p-3 rounded-md" />
      <select className="border p-3 rounded-md">
        <option>Marital Status</option>
        {/* Add options here */}
      </select>
      <select className="border p-3 rounded-md">
        <option>Gender</option>
        {/* Add options here */}
      </select>
      <select className="border p-3 rounded-md">
        <option>Nationality</option>
        {/* Add options here */}
      </select>
      <input type="text" placeholder="Address" className="border p-3 rounded-md col-span-2" />
      <div className="grid grid-cols-3 gap-4 col-span-2">
        <input type="text" placeholder="City" className="border p-3 rounded-md" />
        <input type="text" placeholder="State" className="border p-3 rounded-md" />
        <input type="text" placeholder="ZIP Code" className="border p-3 rounded-md" />
      </div>
    </div>
    <div className="flex justify-end mt-6">
        <button 
          type="button" 
          className="bg-gray-300 py-2 px-4 rounded-md mr-4"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
