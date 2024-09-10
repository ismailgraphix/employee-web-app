'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';

interface Department {
  id: number;
  name: string;
  headId: number;
  createdAt: string;
  updatedAt: string;
  employees: any[];
  head: any;
}

const ProfessionalInfoForm = () => {
  const [departments, setDepartments] = useState<Department[]>([]);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments'); // Adjust endpoint as necessary
        setDepartments(response.data); // Assuming response.data is an array of department names
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className='p-6 border rounded-lg bg-white'>
      <form className="bg-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Employee ID"
            className="border p-3 rounded-md"
          />
          <Input
            type="text"
            placeholder="User Name"
            className="border p-3 rounded-md"
          />
          <select className="border p-3 rounded-md">
            <option>Select Employee Type</option>
            {/* Add options here */}
          </select>
          <Input
            type="email"
            placeholder="Email Address"
            className="border p-3 rounded-md"
          />
         <select className="border p-3 rounded-md">
  <option>Select Department</option>
  {departments.map((dept, index) => (
    <option key={index}>{dept.name}</option> // Only display the name
  ))}
</select>


          <Input
            type="text"
            placeholder="Enter Designation"
            className="border p-3 rounded-md"
          />
          <select className="border p-3 rounded-md">
            <option>Select Working Days</option>
            {/* Add options here */}
          </select>
          <Input
            type="date"
            className="border p-3 rounded-md"
          />
          <select className="border p-3 rounded-md col-span-2">
            <option>Select Office Location</option>
            {/* Add options here */}
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button type="button" className="bg-gray-300 py-2 px-4 rounded-md mr-4">Cancel</button>
          <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md">Next</button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfoForm;
