"use client";
import React from "react";
import { FaUsers, FaBuilding, FaClock, FaDollarSign, FaBriefcase, FaUser, FaUmbrellaBeach, FaClipboardList, FaCog, FaThLarge } from "react-icons/fa"; // Importing icons
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-white p-6 shadow-lg h-screen">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2 mb-10">
        <div className="bg-indigo-100 p-2 rounded-full">
          <FaThLarge className="text-indigo-600" />
        </div>
        <h1 className="text-lg font-bold text-gray-800">construction</h1>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
      <Link href="/dashboard" passHref>
        <li className="flex items-center text-indigo-600">
          <FaThLarge className="mr-2" /> Dashboard
        </li>
        </Link>

        <li>
          <Link href="/employees" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaUsers className="mr-2" /> All Employees
            </p>
          </Link>
        </li>

        <li>
          <Link href="/departments" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaBuilding className="mr-2" /> All Departments
            </p>
          </Link>
        </li>

        <li>
          <Link href="/attendance" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaClock className="mr-2" /> Attendance
            </p>
          </Link>
        </li>

        <li>
          <Link href="/payroll" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaDollarSign className="mr-2" /> Payroll
            </p>
          </Link>
        </li>

        <li>
          <Link href="/dashboard" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaBriefcase className="mr-2" /> Jobs
            </p>
          </Link>
        </li>

        <li>
          <Link href="/candidates" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaUser className="mr-2" /> Candidates
            </p>
          </Link>
        </li>

        <li>
          <Link href="/leaves" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaUmbrellaBeach className="mr-2" /> Leaves
            </p>
          </Link>
        </li>

        <li>
          <Link href="/holidays" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaClipboardList className="mr-2" /> Holidays
            </p>
          </Link>
        </li>

        <li>
          <Link href="/settings" passHref>
            <p className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <FaCog className="mr-2" /> Settings
            </p>
          </Link>
        </li>
      </ul>
      <div className="flex justify-between items-center mt-auto">
  <button className="bg-[#7B3FF3] text-white py-1 px-4 rounded-full text-sm flex items-center gap-1">
    <span>🌞</span> Light
  </button>
  <button className="bg-[#F3F3F3] text-[#7B3FF3] py-1 px-6 rounded-full text-sm flex items-center gap-1">
    <span>🌜</span> Dark
  </button>
</div>

    </div>
  );
};

export default Sidebar;
