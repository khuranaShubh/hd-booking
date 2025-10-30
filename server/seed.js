const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Experience = require("./models/experienceModel"); // ✅ corrected path

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding...");

    const sampleData = [
      {
        title: "Skydiving Adventure",
        description:
          "Experience the thrill of skydiving from 10,000 feet above sea level.",
        price: 4999,
        location: "Goa",
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        ],
      },
      {
        title: "Scuba Diving",
        description:
          "Explore the underwater world and colorful coral reefs.",
        price: 2999,
        location: "Andaman",
        images: [
          "server/assets/pexels-chaitaastic-1796727.jpg",
        ],
      },
      {
        title: "Hot Air Balloon Ride",
        description: "Enjoy a beautiful sunrise from above the clouds.",
        price: 3999,
        location: "Jaipur",
        images: [
          "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
        ],
      },
    ];

    await Experience.deleteMany({});
    await Experience.insertMany(sampleData);

    console.log("✅ Database seeded successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
