'use client';

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

interface Props {
  title:string; 
  image:string;
  slug?:string;
  location?:string;
  date?:string;
  time?:string;
}
const EventCard = ({title,image,slug,location,date,time}:Props) => {
  const handleClick = () => {
    posthog.capture("event_card_clicked", {
      event_slug: slug,
      event_title: title,
      location,
      date,
      time,
      source: "featured_events",
    });
  };

  return(
    <Link href={`/event/${slug}`} id="event-card" className="event-card" onClick={handleClick}>
    <Image src={image} alt={title} width={410} height={200} className="poster" />
    <div className="flex flex-row gap-2">
<Image src='/icons/pin.svg' alt="location" width={14} height={14} className="inline-block" />
    <p className="">{location}</p>

    </div>
    <div className="datetime">

<div >
<Image src='/icons/calendar.svg' alt="calendar" width={14} height={14} className="inline-block" />
    <p className="">{date}</p>

</div>
<div >
<Image src='/icons/clock.svg' alt="calendar" width={14} height={14} className="inline-block" />
    <p className="">{time}</p>

</div>
    </div>
    <p className="event-title">{title} </p>
    </Link>
  )
}

export default EventCard