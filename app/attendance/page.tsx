import Sidebar from "@/components/sidebar";
import { Employees, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Header from "@/components/header";
import Link from "next/link";
import ProfilePage from "@/components/profile";
import TopNavBar from "./_components/top-navbar";


async function getData(): Promise<Employees[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728e3422f",
      employeeName: "Ismail Muhammad Adam",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:30 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "728ed52f",
      employeeName: "Ismail Muhammad Adam",
      date: "2024-08-23",
      status: "late",
      checkInTime: "09:15 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "2e3f4g5h",
      employeeName: "Aisha Suleiman",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:00 AM",
      checkOutTime: "04:00 PM",
    },
    {
      id: "3i4j5k6l",
      employeeName: "Fatima Abubakar",
      date: "2024-08-22",
      status: "absent",
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: "4m5n6o7p",
      employeeName: "Yusuf Bello",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:45 AM",
      checkOutTime: "05:30 PM",
    },
    {
      id: "728ed52f",
      employeeName: "Ismail Muhammad Adam",
      date: "2024-08-23",
      status: "late",
      checkInTime: "09:15 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "5q6r7s8t",
      employeeName: "Zainab Usman",
      date: "2024-08-22",
      status: "on leave",
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: "6u7v8w9x",
      employeeName: "Umar Sadiq",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:10 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "728ed52f",
      employeeName: "Ismail Muhammad Adam",
      date: "2024-08-23",
      status: "late",
      checkInTime: "09:15 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "7y8z9a1b",
      employeeName: "Khadija Hassan",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:25 AM",
      checkOutTime: "04:45 PM",
    },
    {
      id: "8c9d0e1f",
      employeeName: "Aliyu Ahmed",
      date: "2024-08-22",
      status: "absent",
      checkInTime: null,
      checkOutTime: null,
    },
    {
      id: "9g0h1i2j",
      employeeName: "Maryam Ibrahim",
      date: "2024-08-22",
      status: "present",
      checkInTime: "09:00 AM",
      checkOutTime: "05:00 PM",
    },
    {
      id: "0k1l2m3n",
      employeeName: "Saheed Lawal",
      date: "2024-08-22",
      status: "present",
      checkInTime: "08:20 AM",
      checkOutTime: "04:50 PM",
    },
    {
      id: "1o2p3q4r",
      employeeName: "Hauwa Abdullahi",
      date: "2024-08-22",
      status: "on leave",
      checkInTime: null,
      checkOutTime: null,
    },
  ]
}



export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar  />
      <div className="flex-1 p-4 sm:p-10">
     <TopNavBar/>
    

        {/* Content Container */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Button Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            
           
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
  </div>
  );
}
