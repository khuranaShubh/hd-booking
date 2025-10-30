import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Calendar, Users } from "lucide-react";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">
          No booking details found. Please make a booking first.
        </p>
      </div>
    );
  }

  // ✅ Save booking to MongoDB when page loads
  useEffect(() => {
    if (bookingData) {
      fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          email: bookingData.email,
          date: bookingData.date,
          guests: bookingData.guests,
          experienceId: bookingData.experience._id,
          experienceTitle: bookingData.experience.title,
          experiencePrice: bookingData.experience.price,
          experienceLocation: bookingData.experience.location,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Booking saved:", data))
        .catch((err) => console.error("❌ Error saving booking:", err));
    }
  }, [bookingData]);

  const { name, date, guests, experience } = bookingData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-center px-6 py-12">
      <motion.div
        className="bg-white max-w-3xl w-full rounded-3xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Success Icon */}
        <CheckCircle className="mx-auto text-green-500" size={80} />
        <h1 className="text-3xl font-bold mt-4 text-gray-800">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you, <span className="font-semibold">{name}</span>!  
          Your booking for{" "}
          <span className="font-semibold">{experience.title}</span> has been
          successfully confirmed.
        </p>

        {/* Experience Details */}
        <div className="bg-gray-50 mt-8 p-6 rounded-2xl text-left shadow-inner">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={experience.images[0]}
              alt={experience.title}
              className="w-full md:w-64 h-44 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {experience.title}
              </h2>
              <p className="flex items-center text-gray-500 mb-1">
                <MapPin className="mr-2 text-blue-500" size={18} />
                {experience.location}
              </p>
              <p className="flex items-center text-gray-500 mb-1">
                <Calendar className="mr-2 text-blue-500" size={18} />
                {new Date(date).toDateString()}
              </p>
              <p className="flex items-center text-gray-500 mb-1">
                <Users className="mr-2 text-blue-500" size={18} />
                {guests} Guests
              </p>
              <p className="text-blue-600 font-bold mt-2 text-lg">
                ₹{experience.price}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

