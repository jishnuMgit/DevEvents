import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { NextRequest, NextResponse } from "next/server";

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();

    const event = Object.fromEntries(formData.entries()) as any;

    event.mode = event.mode.toLowerCase();
    event.agenda = JSON.parse(event.agenda);
    event.tags = JSON.parse(event.tags);

    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image file not provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "devevents",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }

              if (!result) {
                return reject(new Error("Image upload failed."));
              }

              resolve(result);
            }
          )
          .end(buffer);
      }
    );

    event.image = uploadResponse.secure_url;

    const newEvent = await Event.create(event);

    return NextResponse.json(newEvent, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET() {
  try {
    await connectDB();  

    let events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(events, {
      status: 200,
    });
  } catch (error) {
    console.error(error); 
  }
}

