import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerService = () => {
  const [info, setInfo] = useState(null);
  const [form, setForm] = useState({ subject: "", message: "" });

  useEffect(() => {
    const fetchInfo = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(  `${process.env.REACT_APP_API_BASE_URL}/customer-service`,
 {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(data);
    };
    fetchInfo();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
  `${process.env.REACT_APP_API_BASE_URL}/customer-service/contact`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message);
      setForm({ subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Try again later.");
    }
  };

  if (!info) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Customer Service
        </h1>

        <p className="text-gray-600 mb-4 text-center">{info.message}</p>

        <ul className="list-disc list-inside text-gray-700 mb-6">
          {info.options.map((opt, i) => (
            <li key={i}>{opt}</li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 mb-8 text-center">
          You can also email us at{" "}
          <span className="text-yellow-600 font-semibold">
            {info.contactEmail}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-2 focus:ring-yellow-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerService;
