"use client"

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { Departments, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Link from "next/link";

export default function DemoPage() {
  const [data, setData] = useState<Departments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        setLoading(true);
        const res = await fetch('/api/departments', {
          method: 'GET',
          headers: {
            //'Authorization': `Bearer ${token}`,  // Include token if needed
          },
        });


        const departments = await res.json();
        setData(departments);
      } catch (error) {
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    }

    fetchDepartments();
  }, []); // Empty dependency array to run the effect only once on mount

  
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-10">
        <Header />

        {/* Content Container */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Button Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <Link href={'/departments/department'}>
              <Button className="w-full sm:w-auto mb-4 sm:mb-0">
                Add New Department
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
