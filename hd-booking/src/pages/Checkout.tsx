import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience } = location.state || {}; // ✅ Get experience data from Details page

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    guests: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking Data:", { ...form, experience });
    navigate("/result", { state: { ...form, experience } });
  };

  if (!experience) {
    return (
      <p className="text-center text-gray-600 mt-20">
        No experience selected. Please go back to <a href="/">Home</a>.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-8 flex justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white shadow-lg rounded-3xl p-8 grid md:grid-cols-2 gap-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Complete Your Booking
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Summary Section */}
        <div className="bg-blue-50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <img
              src={experience.images[0]}
              alt={experience.title}
              className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {experience.title}
            </h3>
            <p className="text-gray-600 mb-2">{experience.location}</p>
            <p className="text-gray-500">{experience.description}</p>
          </div>
          <div className="mt-6 text-right">
            <span className="text-xl font-bold text-blue-600">
              ₹{experience.price}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
