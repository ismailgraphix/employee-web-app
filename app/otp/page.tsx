"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EnterOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Only allow one digit per input
      setOtp(newOtp);

      // Move to the next input field if a digit was entered
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    // Handle OTP verification process here
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

      {/* Right side - Enter OTP form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white p-10 shadow-lg">
        <div className="w-full max-w-sm">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center mb-6"
          >
            <span className="mr-2">&lt;</span> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter OTP</h2>
          <p className="text-sm text-gray-600 mb-6">
            We have shared a code to your registered email address <br />
            <span className="font-medium">robertallen@example.com</span>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex space-x-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
