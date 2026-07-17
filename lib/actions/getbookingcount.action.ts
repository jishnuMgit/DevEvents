"use server";

import Booking from "@/database/booking.model";
import connectMongoDB from "@/lib/mongodb";

export async function getBookingCount() {
  await connectMongoDB();

  const count = await Booking.countDocuments();

  return count;
}