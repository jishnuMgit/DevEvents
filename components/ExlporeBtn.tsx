'use client';

import Image from "next/image";
import Link from "next/link";

const ExlporeBtn = () => {
  return (
    <button id="explore-btn" type="button" className="mt-7 mx-auto" onClick={()=>console.log('clicked')}>  <Link href="/explore">
      Explore Events
      <Image src='/icons/arrow-down.svg' alt="arrow right" width={20} height={20} className="ml-2 inline-block" />
    </Link>  </button>
  )
}

export default ExlporeBtn