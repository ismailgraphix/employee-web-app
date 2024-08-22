import Image from "next/image";
import profilePic from "../assets/picture.jpg";
import React, { useState } from "react";
import Link from "next/link";


const ProfilePage = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
    return ( 
        <div className="relative">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <Image
            src={profilePic}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold">Ismail Muhammad</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
            <Link href={'/settings'}>  
            <p
            
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Manage Profile
            </p>
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        )}
      </div>
     );
}
 
export default ProfilePage;