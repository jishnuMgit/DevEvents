import mongoose from "mongoose";
import dns from "node:dns/promises";

// Prefer IPv4 first
// dns.setDefaultResultOrder("ipv4first");

// Set DNS servers
dns.setServers([
  "1.1.1.1", // Cloudflare
  "1.0.0.1",
  "8.8.8.8", // Google
  "8.8.4.4",
]);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let isConnected = false;

const connectMongoDB = async () => {
  try {
    if (isConnected || mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
    });

    isConnected = true;

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    isConnected = false;
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;