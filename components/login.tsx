import Image from 'next/image';
import logo from "../assets/logo.png"
import hide from "../assets/hide.png";
import bglogo from "../assets/campaign-creators-gMsnXqILjp4-unsplash.jpg";
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      toast.success('Login successful!');
      window.location.href = "/dashboard"; // Redirect to dashboard or other page
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      toast.error(err.response?.data?.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:flex-1 relative">
        <Image 
          src={bglogo}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div> 
      
      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-[#f7f8fc]">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-sm w-full">
          <div className="text-center mb-6">
            <Image src={logo} alt="HRMS Logo" width={50} height={50} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome 👋</h2>
          <p className="text-gray-600 mb-6">Please login here</p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-gray-800 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="robertallen@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block font-semibold text-gray-800 mb-1">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-base pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                <Image src={hide} alt="Toggle Password" width={30} height={20} className='justify-center' />
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="form-checkbox" />
                <span>Remember Me</span>
              </label>
              <Link href="/forgotpassword"> 
                <p className="text-[#7e57c2] font-extralight">Forgot Password?</p>
              </Link>
            </div>
            <button
              type="submit"
              className={`bg-[#7e57c2] text-white py-3 px-4 rounded-md w-full font-semibold hover:bg-[#6a42b2] transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
