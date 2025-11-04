import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Amazon Clone</h1>
      {userName ? (
        <p className="text-sm">
          Hello, <span className="font-semibold">{userName}</span>
        </p>
      ) : (
        <p
          className="text-sm text-yellow-400 cursor-pointer"
          onClick={() => (window.location.href = "/login")}
        >
          Sign In
        </p>
      )}
    </div>
  );
};

export default Navbar;
