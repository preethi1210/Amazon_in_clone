import React from 'react';
import { useNavigate } from 'react-router-dom';
const Content6 = () => {
    const navigate = useNavigate(); // ✅ make sure this is inside the component

  return (
    <div className="mt-10 mb-10 p-6 border border-gray-300 rounded-md bg-white flex items-center flex-col items-start space-y-3 shadow">
      <h2 className="text-lg font-semibold text-gray-800">
        See personalized recommendations
      </h2>

      <button className="rounded-md px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition"         onClick={() => navigate("/signin")}
 >
        Sign in
      </button>

      <div className="text-sm text-gray-600">
        <p className="inline">New customer? </p>
        <span className="text-blue-600 cursor-pointer hover:underline ml-1"           onClick={() => navigate("/register")} >
          Start here
        </span>
      </div>
    </div>
  );
};

export default Content6;
