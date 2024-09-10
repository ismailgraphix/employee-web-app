'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { PhoneInput } from './phone-input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/ui/image-upload';
import axios from 'axios';

const PersonalInfoForm = () => {
  const [profilePicture, setProfilePicture] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    maritalStatus: '',
    gender: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

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
      const response = await axios.post('/api/employee/add', {
        ...formData,
        profilePicture: profilePicture[0]
      });
      // Handle success (e.g., navigate to the next form)
      console.log(response.data);
    } catch (error) {
      // Handle error
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
        <Label>Middle Name
          <Input
            type="text"
            placeholder="Middle Name"
            className="border p-3 rounded-md"
            value={formData.middleName}
            onChange={(e) => handleChange('middleName', e.target.value)}
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
          <Select
            value={formData.maritalStatus}
            onValueChange={(value) => handleChange('maritalStatus', value)}
          >
            <SelectTrigger id="maritalStatus">
              <SelectValue placeholder="Marital Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label>Gender
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Label>Nationality
          <Select
            value={formData.nationality}
            onValueChange={(value) => handleChange('nationality', value)}
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="nigeria">Nigeria</SelectItem>
              <SelectItem value="ghana">Ghana</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="india">India</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Input
          type="text"
          placeholder="Address"
          className="border p-3 rounded-md col-span-2"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
        <div className="grid grid-cols-3 gap-4 col-span-2">
          <Input
            type="text"
            placeholder="City"
            className="border p-3 rounded-md"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
          <Input
            type="text"
            placeholder="State"
            className="border p-3 rounded-md"
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
          <Input
            type="text"
            placeholder="ZIP Code"
            className="border p-3 rounded-md"
            value={formData.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button type="button" className="bg-gray-300 py-2 px-4 rounded-md mr-4">Cancel</button>
        <button type="button" className="bg-indigo-500 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
