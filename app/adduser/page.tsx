'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';  
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import ImageUpload from '@/components/ui/image-upload';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  profilePicture?: string; // Updated to handle a single image URL
  role?: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]); // For storing uploaded image URLs
  
  const { register, handleSubmit, reset } = useForm<RegisterFormValues>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const formData = {
        ...data,
        profilePicture: images[0] || 'https://res.cloudinary.com/dpeltnw9s/image/upload/v1700731985/e3old9s8nnfq9naii2y4.png', // Use default image if none uploaded
      };

      const response = await axios.post('/api/auth/register', formData);
      toast.success('Registration successful!');
      reset();
      router.push('/login'); // Redirect to login page after successful registration
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const handleImageRemove = (url: string) => {
    setImages((prev) => prev.filter((image) => image !== url));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-6 bg-white border rounded-md shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
        <Toaster position="top-center" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" placeholder="Your Name" {...register('name', { required: true })} />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Your Email" {...register('email', { required: true })} />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" {...register('password', { required: true })} />
          </div>
          <div className="mb-4">
            <Label htmlFor="role">Role (optional)</Label>
            <Input type="text" id="role" placeholder="Role" {...register('role')} />
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <Label>Upload Profile Picture</Label>
            <ImageUpload
              value={images}
              onChange={handleImageChange}
              onRemove={handleImageRemove}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
