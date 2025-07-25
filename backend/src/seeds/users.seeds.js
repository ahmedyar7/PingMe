import "dotenv/config";
import { connectDb } from "../database/connectDb.database.js";
import { User } from "../models/user.models.js";

const seedUsers = [
  // Female Users
  {
    email: "zoha.khan@example.com",
    fullname: "Zoha Khan",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    email: "rida.ali@example.com",
    fullname: "Rida Ali",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    email: "bakhtawar.javed@example.com",
    fullname: "Bakhtawar Javed",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "zareen.fatima@example.com",
    fullname: "Zareen Fatima",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    email: "hira.mehmood@example.com",
    fullname: "Hira Mehmood",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "ayaan.shaikh@example.com",
    fullname: "Ayaan Shaikh",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    email: "nimra.iqbal@example.com",
    fullname: "Nimra Iqbal",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    email: "mahnoor.hassan@example.com",
    fullname: "Mahnoor Hassan",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/women/17.jpg",
  },

  // Male Users
  {
    email: "ayaan.hassan@example.com",
    fullname: "Ayaan Hassan",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    email: "hamza.aziz@example.com",
    fullname: "Hamza Aziz",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "ahmed.yar@example.com",
    fullname: "Ahmed Yar",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "gul.zareen@example.com",
    fullname: "Gul Zareen",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "faizan.khan@example.com",
    fullname: "Faizan Khan",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    email: "hamza.sajid@example.com",
    fullname: "Hamza Sajid",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    email: "uzair.ahmed@example.com",
    fullname: "Uzair Ahmed",
    password: "123456",
    profilePicture: "https://randomuser.me/api/portraits/men/16.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();
    await User.insertMany(seedUsers);
    console.log("✅ Database seeded successfully with Pakistani names");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
