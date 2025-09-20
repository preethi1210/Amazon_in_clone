import React, { useState } from 'react';
import amazon from '../HomePage/images/Amazon_black.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!input.trim()) {
      setError('Please enter your email or mobile number');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/user/exists?identifier=${input}`, {
              method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Server error');
      }

      localStorage.setItem('userIdentifier', input);

      if (data.exists) {
        localStorage.setItem('userName', data.name || '');
        navigate('/login');
      } else {
        navigate('/intent');
      }
    } catch (err) {
      console.error('Error checking user:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />
      <div className="border border-gray-400 p-6 w-80 rounded">
        <h2 className="text-xl font-bold mb-2">Sign in or create account</h2>

        <label className="block text-sm mb-1">Email or mobile phone number</label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          className="w-full border border-gray-400 px-3 py-2 rounded mb-2"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleContinue}
          className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded w-full"
        >
          Continue
        </button>

        <p className="text-xs mt-4">
          By continuing, you agree to Amazon's{' '}
          <span className="text-blue-500 hover:underline cursor-pointer">Conditions of Use</span>{' '}
          and <span className="text-blue-500 hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        <hr className="my-4 border-gray-300" />

        <b className="text-sm">Buying for work?</b><br />
        <a href="#" className="text-blue-500 text-sm hover:underline">Create a free business account</a>
      </div>

      <hr className="my-4 border-gray-300 w-80" />

      <div className="flex justify-center mt-10 gap-4 text-sm text-blue-500">
        <a href="#" className="hover:underline">Conditions of Use</a>
        <a href="#" className="hover:underline">Privacy Notice</a>
        <a href="#" className="hover:underline">Help</a>
      </div>

      <p className="text-xs text-center text-gray-600 mt-4">
        © 1996–2025, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
};

export default SignIn;
