"use client";

import React, { useState } from 'react';
import { CiUser, CiFileOn, CiLock } from 'react-icons/ci';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // Icons for toggle
import { BsBriefcase } from 'react-icons/bs';

interface TabsProps {
  setActiveTab: (tab: string) => void;
  activeTab: string; // Track the active tab
}

const Tabs: React.FC<TabsProps> = ({ setActiveTab, activeTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle the toggle

  // Function to return the correct styles for active/inactive tabs
  const getButtonClass = (tabName: string) =>
    activeTab === tabName
      ? "py-2 px-4 text-blue-500 border-b-4 border-blue-500 font-semibold" // Active styles
      : "py-2 px-4 text-gray-500 border-b-2 border-transparent"; // Inactive styles

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
          className={getButtonClass('personal')}
          onClick={() => setActiveTab('personal')}
        >
          <CiUser className="inline-block mr-2" />
          Personal Information
        </button>
        <button
          className={getButtonClass('professional')}
          onClick={() => setActiveTab('professional')}
        >
          <BsBriefcase className="inline-block mr-2" />
          Professional Information
        </button>
        <button
          className={getButtonClass('documents')}
          onClick={() => setActiveTab('documents')}
        >
          <CiFileOn className="inline-block mr-2" />
          Documents
        </button>
        <button
          className={getButtonClass('access')}
          onClick={() => setActiveTab('access')}
        >
          <CiLock className="inline-block mr-2" />
          Account Access
        </button>
      </div>
    </div>
  );
};

export default Tabs;
