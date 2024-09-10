"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

const AccountAccessForm = () => {
  return (
    <div className='p-6 border rounded-lg bg-white'> 
    <form className="bg-white p-6 rounded-lg ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Label> email address
        <Input 
          type="email" 
          placeholder="Enter Email Address" 
          className="border p-3 rounded-md"
        />
        </Label>
        <Label>  Password
        <Input 
          type="text" 
          placeholder="Password" 
          className="border p-3 rounded-md"
        />
        </Label>
        
        <Label>  Select Employee Role
        <Select>
          <SelectTrigger id="role">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="male">Employee</SelectItem>
            <SelectItem value="female">Admin</SelectItem>
          </SelectContent>
        </Select>
        </Label>
        
    
       
      </div>
      <div className="flex justify-end mt-6">
        <button 
          type="button" 
          className="bg-gray-300 py-2 px-4 rounded-md mr-4"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="bg-indigo-500 text-white py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </form>
    </div>
  );
};

export default AccountAccessForm;
