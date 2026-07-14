import EventCard from "@/components/EventCard"
import ExlporeBtn from "@/components/ExlporeBtn"

const events = [
  {image:'/images/event1.png',title:'Hackathon',slug:'event-1',location:'New York',date:'2023-05-01',time:'10:00 AM'},
  {image:'/images/event2.png',title:'Meetup',slug:'event-2',location:'Los Angeles',date:'2023-05-02',time:'2:00 PM'},
  {image:'/images/event3.png',title:'Conference',slug:'event-3',location:'Chicago',date:'2023-05-03',time:'11:00 AM'},
  {image:'/images/event4.png',title:'Workshop',slug:'event-4',location:'Houston',date:'2023-05-04',time:'3:00 PM'},
]

const page = () => {
  return (
<section>
    <h1 className="text-center">welcome to my app</h1>

<p className="text-center mt-5">Hackathons,meetups, and conferences for developers.</p>
<ExlporeBtn/>

<div className="mt-20 space-y-7">
<h3>Featured Events</h3>

<ul className="events list-none p-0 m-0">
  {events.map((event, index) => (
    <li key={index} className="event">
      <EventCard {...event} />
    </li>
  ))}
</ul>

</div>
</section>  )
}

export default page