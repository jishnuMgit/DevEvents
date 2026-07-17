'use client'

import { CreateBooking } from "@/lib/actions/booking.action";
import posthog from "posthog-js";
import { useState } from "react";
type EventProps = {
  slug: string;
  eventId:string;
};

const BookEvent = ({slug,eventId}:EventProps) => {
    const [email,setEmail] = useState("");
    const [submitted,setSubmitted] = useState(false);

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
  
  
  e.preventDefault();

  // console.log(eventId,slug,email)
  if (!email) {
  } else {
      const {success,error,message}=await CreateBooking({ eventId,slug,email})
if(success){
      alert(message);
      posthog.capture('event booked',{eventId,slug,email})

    setSubmitted(true);

}else{
        alert(message);
posthog.captureException(error)
  setSubmitted(false)
}
  }
};

  return (
    <div id="book-event">
        {submitted?(
            <div className="success-message">
                <h3>Thank you for booking your spot!</h3>
            </div>
        ):(
            
            <form onSubmit={handleSubmit}>
<div>
<label htmlFor="email">
Email Address
</label>
<input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter your email" />

</div>
<button type="submit" >
                    Book Your Spot
                </button>

            </form>
        )}
    </div>
  )
}

export default BookEvent