"use client";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import ProfilePage from "./profile";
import NotificationList from "./notification-button"; // Import the NotificationList component

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false); // State to control notification list visibility

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      {/* Left Side: Greeting */}
      <div>
        <h1 className="text-2xl font-bold">Hello Ismail 👋</h1>
        <p className="text-gray-500">Good Morning</p>
      </div>

      {/* Right Side: Search, Notifications, and Profile */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1115.66 3 7.5 7.5 0 0116.65 16.65z"
            />
          </svg>
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            className="relative p-2 bg-gray-100 rounded-full"
            onClick={toggleNotifications} // Toggle notification list visibility
          >
            <FaBell className="w-5 h-5 text-gray-500" />
          </button>

          {/* Render NotificationList conditionally based on showNotifications state */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
              <NotificationList />
            </div>
          )}
        </div>

        {/* Profile Picture and Dropdown */}
        <ProfilePage />
      </div>
    </div>
  );
};

export default Header;
