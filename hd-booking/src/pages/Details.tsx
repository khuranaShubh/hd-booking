import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
}

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/experiences/${id}`)
        .then((res) => res.json())
        .then((data) => setExperience(data))
        .catch((err) => console.error("Error fetching experience:", err));
    }
  }, [id]);

  if (!experience) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading experience...
      </div>
    );
  }

  const handleBooking = () => {
    navigate(`/checkout/${experience._id}`, { state: { experience } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-8 py-12 flex justify-center">
      <motion.div
        className="max-w-6xl w-full bg-white shadow-xl rounded-3xl overflow-hidden grid md:grid-cols-2 gap-6 p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Section */}
        <motion.img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />

        {/* Info Section */}
        <div className="flex flex-col justify-between p-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {experience.title}
            </h1>
            <div className="flex items-center text-gray-500 mb-4">
              <MapPin size={20} className="mr-2 text-blue-500" />
              {experience.location}
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {experience.description}
            </p>
            <div className="flex items-center text-2xl font-semibold text-blue-600 mt-4">
              <IndianRupee size={22} className="mr-1" />
              {experience.price}
            </div>
          </div>

          <motion.button
            onClick={handleBooking}
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
