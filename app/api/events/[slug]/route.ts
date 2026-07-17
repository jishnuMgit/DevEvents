import Event from "@/database/event.model";
import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

type RouteParams = {
  params:Promise<{
    slug: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  try {

   await connectMongoDB()
    const { slug } = await params;

    console.log(slug);

    const event = await Event.findOne({ slug });

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}