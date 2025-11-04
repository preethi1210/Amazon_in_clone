import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
      });
      
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };
    const saveDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/user/profile",
        { ...user },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User details updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update user details.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal Details</h2>
          {!isEditing ? (
            <button
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-black font-semibold"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              user.name
            )}
          </div>
          <div>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              user.email
            )}
          </div>
          <div>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            ) : (
              user.phone
            )}
          </div>
          <div>
  <strong>Address:</strong>
  {isEditing ? (
    <div className="space-y-2">
      <input
        type="text"
        name="address.street"
        value={user.address.street}
        onChange={handleChange}
        placeholder="Street"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="text"
        name="address.city"
        value={user.address.city}
        onChange={handleChange}
        placeholder="City"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="text"
        name="address.state"
        value={user.address.state}
        onChange={handleChange}
        placeholder="State"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="text"
        name="address.postcode"
        value={user.address.postcode}
        onChange={handleChange}
        placeholder="Postcode"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="text"
        name="address.country"
        value={user.address.country}
        onChange={handleChange}
        placeholder="Country"
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  ) : (
    <p>
      {`${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.postcode}, ${user.address.country}`}
    </p>
  )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Account;
