// components/SimilarEvents.tsx

import { GetSimilarEvents } from "@/lib/actions/event.actions";
import EventCard from "./EventCard";

export default async function SimilarEvents({
  slug,
}: {
  slug: string;
}) {
  const events = await GetSimilarEvents(slug);

  return (
    <div className="events">
      {events.map((event: any) => (
        <EventCard key={event._id} {...event} />
      ))}
    </div>
  );
}