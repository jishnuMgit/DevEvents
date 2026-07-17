"use server";

import Booking from "@/database/booking.model";
import connectMongoDB from "../mongodb";

type CreateBookingParams = {
  eventId: string;
  slug: string;
  email: string;
};

export const CreateBooking = async ({
  eventId,
  slug,
  email,
}: CreateBookingParams) => {
  try {
    await connectMongoDB();


    const isbooked=await Booking.findOne({email})

    if(isbooked){
        return {
      success: false,
      message: "booking already done in this email",
    };
    }

    const bookingDoc = await Booking.create({
      eventId,
      slug,
      email,
    });

    const booking = {
      id: bookingDoc._id.toString(),
      eventId: bookingDoc.eventId.toString(),
      slug: bookingDoc.slug,
      email: bookingDoc.email,
      createdAt: bookingDoc.createdAt,
      updatedAt: bookingDoc.updatedAt,
    };

    return {
      success: true,
      booking,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error,
      message: "Failed to create booking.",
    };
  }
};