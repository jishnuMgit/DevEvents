import Image from "next/image";
import Link from "next/link";


interface Props {
  title:string; 
  image:string;
  slug?:string;
  location?:string;
  date?:string;
  time?:string;
}
const EventCard = ({title,image,slug,location,date,time}:Props) => {
  return(
    <Link href={`/event/${slug}`} id="event-card" className="event-card">
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