'use client'

import { useState } from "react";

const BookEvent = () => {
    const [email,setEmail] = useState("");
    const [submitted,setSubmitted] = useState(false);

const handleSubmit =(e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!email) {
    alert("Please enter a valid email address");
  } else {
    setSubmitted(true);
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
<button type="submit" onClick={(e) => {
                    e.preventDefault();
                    setSubmitted(true)
                }}>
                    Book Your Spot
                </button>

            </form>
        )}
    </div>
  )
}

export default BookEvent