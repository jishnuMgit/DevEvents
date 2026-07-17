import Event from "@/database/event.model";
import connectMongoDB from "@/lib/mongodb";
import EventCard from "@/components/EventCard";
import ExlporeBtn from "@/components/ExlporeBtn";
import FeaturedEventsTracker from "@/components/FeaturedEventsTracker";
import { cacheLife } from "next/cache";

export default async function Page() {
  "use cache";
  cacheLife("hours");

  await connectMongoDB();

  const events = (await Event.find().lean()).map((event: any) => ({
    ...event,
    _id: event._id.toString(),
    createdAt: event.createdAt?.toISOString?.() ?? event.createdAt,
    updatedAt: event.updatedAt?.toISOString?.() ?? event.updatedAt,
  }));

  return (
    <section>
      <h1 className="text-center">Welcome to my app</h1>

      <p className="text-center mt-5">
        Hackathons, meetups, and conferences for developers.
      </p>

      <ExlporeBtn />

      <div className="mt-20 space-y-7">
        <FeaturedEventsTracker eventCount={events.length} />

        <h3>Featured Events</h3>

        <ul className="events list-none p-0 m-0">
          {events.map((event) => (
            <li key={event._id} className="event">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}