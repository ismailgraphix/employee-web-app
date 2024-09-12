"use client"

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import { Employees, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Link from "next/link";
import axios from 'axios'; // Import Axios
import AddEmployeeAction from "./_components/addemployeeaction";

// Fetch data from the API
async function getData(): Promise<Employees[]> {
  try {
    const response = await axios.get('/api/employees'); // Ensure this route is correct
    return response.data;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    return []; // Return an empty array in case of error
  }
}

export default function DemoPage() {
  const [data, setData] = useState<Employees[]>([]);

  useEffect(() => {
    async function fetchData() {
      const employees = await getData();
      setData(employees);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-10">
        <Header />
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <AddEmployeeAction/>
            <Button variant="outline" className="w-full sm:w-auto"></Button>
          </div>
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

