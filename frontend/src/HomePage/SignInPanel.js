import React from 'react';
const SignInPanel = () => {
  return (
    <div className="p-4 border-b border-gray-300 text-center">
      <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm py-1.5 px-6 rounded-sm">
        Sign in
      </button>
      <p className="text-xs mt-1">
        New customer?{' '}
        <a href="#" className="text-blue-500 hover:underline">
          Start here.
        </a>
      </p>
    </div>
  );
};


export default SignInPanel;
