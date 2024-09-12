'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { PhoneInput } from './phone-input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/ui/image-upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PersonalInfoForm = () => {
  const [profilePicture, setProfilePicture] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    maritalStatus: '',
    gender: '',
    address: ''
  });

  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleProfilePictureChange = (url: string) => {
    setProfilePicture([url]);
  };

  const handleProfilePictureRemove = (url: string) => {
    setProfilePicture(profilePicture.filter(pic => pic !== url));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/employees', {
        ...formData,
        profilePicture: profilePicture[0]
      });
      console.log('Employee Created:', response.data);
      // Redirect to the next form (Professional Info)
      router.push('/professional-info');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className='p-6 border rounded-lg bg-white'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Label>Profile Picture
          <ImageUpload 
            value={profilePicture}
            onChange={handleProfilePictureChange}
            onRemove={handleProfilePictureRemove}
          />
        </Label>
        <Label>First Name
          <Input
            type="text"
            placeholder="First Name"
            className="border p-3 rounded-md"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </Label>
        <Label>Last Name
          <Input
            type="text"
            placeholder="Last Name"
            className="border p-3 rounded-md"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </Label>
        <Label>Phone Number
          <PhoneInput
            value={formData.phoneNumber}
            onChange={(value) => handleChange('phoneNumber', value)}
          />
        </Label>
        
        <Label>Email Address
          <Input
            type="email"
            placeholder="Email Address"
            className="border p-3 rounded-md"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Label>
        <Label>Date of Birth
          <Input
            type="date"
            placeholder="Date of Birth"
            className="border p-3 rounded-md"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          />
        </Label>
        <Label>Marital Status
          <Input
            type="text"
            placeholder="Marital Status"
            className="border p-3 rounded-md"
            value={formData.maritalStatus}
            onChange={(e) => handleChange('maritalStatus', e.target.value)}
          />
        </Label>
        <Label>Gender
          <Input
            type="text"
            placeholder="Gender"
            className="border p-3 rounded-md"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          />
        </Label>
        <Input
          type="text"
          placeholder="Address"
          className="border p-3 rounded-md col-span-2"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-6">
        <button type="button" className="bg-gray-300 py-2 px-4 rounded-md mr-4">Cancel</button>
        <button type="button" className="bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
