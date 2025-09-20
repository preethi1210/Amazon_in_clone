import React from 'react';
import { Link } from 'react-router-dom';

const SignInPanel = () => {
  return (
    <div className="p-4 border-b border-gray-300 text-center">
      <Link to="/signin">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm py-1.5 px-6 rounded-sm">
          Sign in
        </button>
      </Link>
      <p className="text-xs mt-1">
        New customer?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
          Start here.
        </Link>
      </p>
    </div>
  );
};

export default SignInPanel;
