'use client';

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

const ExlporeBtn = () => {
  const handleClick = () => {
    posthog.capture("explore_events_clicked", {
      destination: "/explore",
      cta_location: "hero",
      cta_label: "Explore Events",
    });
  };

  return (
    <Link href="/explore" id="explore-btn" className="mt-7 mx-auto inline-block" onClick={handleClick}>
      Explore Events
      <Image src='/icons/arrow-down.svg' alt="arrow right" width={20} height={20} className="ml-2 inline-block" />
    </Link>
  )
}

export default ExlporeBtn