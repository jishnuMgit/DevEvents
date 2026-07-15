'use client'

import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "Events" },
  { href: "/", label: "Create Event" },
]

const Navbar = () => {
  const handleNavClick = (label: string, href: string) => {
    posthog.capture("navigation_link_clicked", {
      label,
      destination: href,
      location: "header",
    })
  }

  return (
    <header>
      <nav>
        <Link href='/' className='logo' onClick={() => handleNavClick("Logo", "/")}>
        <Image src='/icons/logo.png' alt='logo' width={24} height={24} />
        <p>DevEvents</p>

        </Link>
        <ul>
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => handleNavClick(item.label, item.href)}>
              {item.label}
            </Link>
          ))}
        </ul>
       
      </nav>
    </header>
  )
}

export default Navbar