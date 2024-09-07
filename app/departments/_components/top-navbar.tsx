"use client"
import ProfilePage from "@/components/profile";
import React from 'react';

const TopNavBar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div>
        
        <h1 className="text-xl font-semibold">Departments</h1>
        
        <p className="text-sm text-gray-500">All Departments </p>
      </div>
      <div className="flex items-center">
        
       <ProfilePage/>
      </div>
    </div>
  );
};

export default TopNavBar;
