"use client"
import { RiArrowLeftWideFill } from "react-icons/ri";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the OTP sending process here
    console.log('OTP sent to:', email);

    // Redirect to the OTP page
    router.push('/otp');
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side - HRMS Dashboard image placeholder */}
      <div className="hidden lg:flex lg:flex-1 lg:bg-white lg:shadow-lg lg:flex-col lg:justify-between lg:h-full">
        {/* Insert your Dashboard content here */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">HRMS Dashboard</h1>
          {/* Replace this with actual dashboard content */}
          <p>Dashboard content goes here.</p>
        </div>
      </div>

      {/* Right side - Forgot Password form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white p-10 shadow-lg">
        <div className="w-full max-w-sm">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center mb-6"
          >
            <span className="mr-2"><RiArrowLeftWideFill /></span> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Forgot Password</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your registered email address, we&apos;ll send you a code to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
