import BookEvent from "@/components/BookEvent";
import SimilarEvents from "@/components/SimilarEvents";
import { getBookingCount } from "@/lib/actions/getbookingcount.action";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";

const EventDetail = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {
  return (
    <div className="flex flex-row gap-2">
      <Image
        src={icon}
        alt={alt}
        width={14}
        height={14}
        style={{ width: 14, height: 14 }}
        className="inline-block"
      />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agenda }: { agenda: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul className="list-none p-0 m-0">
        {agenda.map((item, index) => (
          <li key={index} className="flex flex-row gap-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="tags">
      <ul className="list-none flex flex-row gap-2 flex-wrap">
        {tags.map((item, index) => (
          <li key={index}>
            <div className="pill w-auto">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---- Booking count: dynamic, must NOT be inside the cached component ----
const BookingCount = async () => {
  const count = await getBookingCount();
  return count > 0 ? (
    <p className="text-lg font-bold">
      join {count} people who have already booked their spots!
    </p>
  ) : (
    <p className="text-sm">Be the first to book your spot!</p>
  );
};

// ---- Cached content: awaits `params`, so it must live INSIDE Suspense ----
const EventContent = async ({ params }: { params: Promise<{ slug: string }> }) => {
  'use cache';
  cacheTag("slugparams");
  cacheLife("hours");

  const { slug } = await params;

  const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!request.ok) {
    throw new Error("Failed to fetch event data");
  }

  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
      _id,
    },
  } = await request.json();

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt={overview}
            width={800}
            height={800}
            className="poster border-b-slate-50 rounded-2xl"
          />

          <section className="flex flex-col gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
            <EventDetail icon="/icons/calendar.svg" alt="calendar" label={date} />
            <EventDetail icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetail icon="/icons/pin.svg" alt="location" label={location} />
            <EventDetail icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetail icon="/icons/audience.svg" alt="audience" label={audience} />
          </section>

          <EventAgenda agenda={agenda} />

          <section className="flex flex-col gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
            <EventTags tags={tags} />
          </section>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            <Suspense fallback={<p className="text-sm">Loading spots...</p>}>
              <BookingCount />
            </Suspense>
            <BookEvent eventId={_id} slug={slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-2 mt-4 pt-20">
        <h2>Similar Events</h2>
        <Suspense fallback={<p>Loading similar events...</p>}>
          <div>
            <SimilarEvents slug={slug} />
          </div>
        </Suspense>
      </div>
    </section>
  );
};

// ---- Page: sync wrapper, returns Suspense immediately ----
const EventPagedetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  return (
    <Suspense fallback={<p>Loading event...</p>}>
      <EventContent params={params} />
    </Suspense>
  );
};

export default EventPagedetail;