"use client";

import React from 'react';

const AccountAccessForm = () => {
  return (
    <div className='p-6 border rounded-lg bg-white'> 
    <form className="bg-white p-6 rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="email" 
          placeholder="Enter Email Address" 
          className="border p-3 rounded-md"
        />
        <input 
          type="text" 
          placeholder="Enter Slack ID" 
          className="border p-3 rounded-md"
        />
        
        <input 
          type="text" 
          placeholder="Enter Skype ID" 
          className="border p-3 rounded-md"
        />
        
        <input 
          type="text" 
          placeholder="Enter Github ID" 
          className="border p-3 rounded-md"
        />
       
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
    </form>
    </div>
  );
};

export default AccountAccessForm;
