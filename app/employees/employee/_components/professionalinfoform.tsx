'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Department = {
  id: number;
  name: string;
};

const ProfessionalInfoForm = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    userName: '',
    department: '',
    position: '',
    startDate: ''
  });

  const router = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/employees', formData); // Post additional professional data
      router.push('/documents');  // Redirect to the documents section
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className='p-6 border rounded-lg bg-white'>
      <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Employee ID"
            className="border p-3 rounded-md"
            value={formData.employeeId}
            onChange={(e) => handleChange('employeeId', e.target.value)}
          />
          <Input
            type="text"
            placeholder="User Name"
            className="border p-3 rounded-md"
            value={formData.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
          />
          <select
            className="border p-3 rounded-md"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          <Input
            type="text"
            placeholder="Position"
            className="border p-3 rounded-md"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
          />
          <Input
            type="date"
            placeholder="Start Date"
            className="border p-3 rounded-md"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
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
