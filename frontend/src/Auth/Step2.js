import React, { useEffect, useState } from 'react';
import amazon from '../HomePage/images/Amazon_black.png';
import { useNavigate } from 'react-router-dom';

const Step2 = () => {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedIdentifier = localStorage.getItem('userIdentifier');
    const savedName = localStorage.getItem('userName');
    if (savedIdentifier) setIdentifier(savedIdentifier);
    if (savedName) setName(savedName);
  }, []);

  const proceed = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <img src={amazon} alt="Amazon" className="w-20 mb-5" />
      <div className="border border-gray-400 p-6 w-[350px]">
        <h2 className="text-xl font-bold mb-2">
          {name ? `Welcome ${name}, ` : ''}Looks like you are new to Amazon
        </h2>
        <p className="mb-2">
          {identifier}{' '}
          <span
            onClick={() => navigate('/signin')}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            change
          </span>
        </p>
        <p>Let's create an account using your mobile number
</p>
        <button
          onClick={proceed}
          className="bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded w-full"
        >
          Proceed to create an account
        </button>
                <hr className="my-4 border-gray-300" />
        <b className="text-sm">Already a customer?</b>
        <br />
        <a href="/signin" className="text-blue-500 text-sm hover:underline">
          Sign in with another email or mobile
        </a>

      </div>
                <hr className="my-4 border-gray-500" />

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

export default Step2;
