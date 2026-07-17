"use server";

import Event from "@/database/event.model";
import connectMongoDB from "../mongodb";

export const GetSimilarEvents = async (slug: string) => {
  try {
    await connectMongoDB();

    const event = (await Event.findOne({ slug }).lean()) as {
      _id: unknown;
      tags: string[];
      createdAt?: Date;
      updatedAt?: Date;
    } | null;

    if (!event) return [];

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents.map((item) => ({
      ...item,
      _id: String(item._id),
      createdAt: item.createdAt?.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
