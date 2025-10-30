import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/experiences")
      .then((res) => res.json())
      .then((data) => {
        // If less than 8 experiences, duplicate to fill grid for design preview
        const filledData =
          data.length < 8
            ? [...data, ...data.slice(0, 8 - data.length)]
            : data.slice(0, 8);
        setExperiences(filledData);
      })
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
    
      <h2 className="text-3xl md:text-4xl font-semibold text-center mt-10 mb-8 text-gray-800">
        Explore Experiences
      </h2>

      {/* ✅ Grid of 4 cards per row, 8 total */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 pb-16">
        {experiences.map((exp, index) => (
          <Link
            to={`/details/${exp._id}`}
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={exp.images[0]}
              alt={exp.title}
              className="w-full h-[220px] object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.title}
                </h3>
                <span className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-lg">
                  {exp.location}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {exp.description}
              </p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-lg font-semibold text-gray-900">
                  From{" "}
                  <span className="text-gray-900 font-bold">₹{exp.price}</span>
                </span>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
