import Sidebar from "@/components/sidebar";
import { Employees, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Header from "@/components/header";
import Link from "next/link";


async function getData(): Promise<Employees[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728e3422f",
     designation: "software engineer",
      status: "permanent",
      name: "Ismail Muhammad Adam",
      department: "human resource",
      type: "office",
    },
    {
        id: "728ed52f",
       designation: "HR",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "IT",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "registry",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
       designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "728ed52f",
        designation: "software engineer",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        type: "office",
      },
      {
        id: "1a2b3c4d",
        status: "permanent",
        name: "Ismail Muhammad Adam",
        department: "human resource",
        designation: "HR",
        type: "office",
      },
      {
        id: "2e3f4g5h",
        status: "contract",
        name: "Aisha Suleiman",
        department: "IT",
        designation: "software engineer",
        type: "remote",
      },
      {
        id: "3i4j5k6l",
        status: "internship",
        name: "Fatima Abubakar",
        department: "registry",
        designation: "record",
        type: "office",
      },
      {
        id: "4m5n6o7p",
        status: "permanent",
        name: "Yusuf Bello",
        department: "IT",
        designation: "designer",
        type: "remote",
      },
      {
        id: "5q6r7s8t",
        status: "contract",
        name: "Zainab Usman",
        department: "registry",
        designation: "registry",
        type: "office",
      },
      {
        id: "6u7v8w9x",
        status: "internship",
        name: "Umar Sadiq",
        department: "human resource",
        designation: "sales",
        type: "office",
      },
      {
        id: "7y8z9a1b",
        status: "permanent",
        name: "Khadija Hassan",
        department: "IT",
        designation: "software engineer",
        type: "remote",
      },
      {
        id: "8c9d0e1f",
        status: "contract",
        name: "Aliyu Ahmed",
        department: "registry",
        designation: "registry",
        type: "office",
      },
      {
        id: "9g0h1i2j",
        status: "internship",
        name: "Maryam Ibrahim",
        department: "human resource",
        designation: "HR",
        type: "remote",
      },
      {
        id: "0k1l2m3n",
        status: "permanent",
        name: "Saheed Lawal",
        department: "IT",
        designation: "designer",
        type: "office",
      },
      {
        id: "1o2p3q4r",
        status: "contract",
        name: "Hauwa Abdullahi",
        department: "human resource",
        designation: "sales",
        type: "remote",
      },
    // ...
  ]
}



export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-6 sm:py-10 px-4 sm:px-6">
        <Header />

        {/* Content Container */}
        <div className="p-6 border rounded-lg bg-white">
          {/* Button Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <Link href={'/employees/employee'}>
              <Button className="w-full sm:w-auto mb-4 sm:mb-0">
                Add New Employee
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              {/* Outline Button */}
            </Button>
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
