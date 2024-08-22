"use client";

import React, { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Icons for toggle

interface TabsProps {
  setActiveTab: (tab: string) => void; // Explicitly define the type
}

const Tabs: React.FC<TabsProps> = ({ setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle the toggle

  return (
    <div className="mb-6">
      {/* Toggle Button for Small Screens */}
      <button
        className="sm:hidden flex items-center justify-between w-full p-4 border-b"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        <span className="font-semibold text-blue-500">Menu</span>
      </button>

      {/* Tabs Container */}
      <div
        className={`flex flex-col sm:flex-row border-b transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'} sm:block`}
      >
        <button
          className="py-2 px-4 text-blue-500 border-b-2 border-blue-500 font-semibold"
          onClick={() => setActiveTab('personal')}
        >
          <CiUser className="inline-block mr-2" />
          Personal Information
        </button>
        <button
          className="py-2 px-4 text-gray-500"
          onClick={() => setActiveTab('professional')}
        >
          Professional Information
        </button>
        <button
          className="py-2 px-4 text-gray-500"
          onClick={() => setActiveTab('documents')}
        >
          Documents
        </button>
        <button
          className="py-2 px-4 text-gray-500"
          onClick={() => setActiveTab('access')}
        >
          Account Access
        </button>
      </div>
    </div>
  );
};

export default Tabs;
