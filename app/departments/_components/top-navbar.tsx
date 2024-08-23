"use client"
import ProfilePage from "@/components/profile";
import logo from "assets/logo.png"
import Image from 'next/image';
import Link from "next/link";
import React from 'react';

const TopNavBar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white shadow-sm">
      <div>
        
        <h1 className="text-xl font-semibold">Departments</h1>
        
        <p className="text-sm text-gray-500">All Departments </p>
      </div>
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search" 
          className="border border-gray-300 rounded-md p-2"
        />
       <ProfilePage/>
      </div>
    </div>
  );
};

export default TopNavBar;
