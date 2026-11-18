"use client"

import { useEffect, useState } from "react"

const REGISTRATION_URL = "https://forms.gle/SD2RkfVTwZcWujkw5"
const EVENT_DATE = new Date("2026-11-28T08:00:00+01:00")

function BrandMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark${small ? " brand-mark-small" : ""}`} aria-hidden="true">
      <span>K</span>
    </span>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M7 3v4M17 3v4M3 10h18" />
      <path d="M7 14h3v3H7z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export default function Home() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, EVENT_DATE.getTime() - Date.now())
      setCountdown({
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining / 3600000) % 24),
        minutes: Math.floor((remaining / 60000) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      })
    }

    updateCountdown()
    const timer = window.setInterval(updateCountdown, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const register = () => window.open(REGISTRATION_URL, "_blank", "noopener,noreferrer")

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="KAIROS home">
            <BrandMark />
            <span className="wordmark">
              <strong>KAIROS</strong>
              <small>God&apos;s appointed time</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#details">Event details</a>
          </div>
          <button className="nav-register" type="button" onClick={register}>
            Register now
          </button>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><span /> McPherson University Prays</p>
            <h1>This is your <em>appointed time.</em></h1>
            <p className="hero-message">
              Heaven has been whispering. On the 28th, we gather to respond in worship,
              prayer, intercession and an atmosphere of divine encounter.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={register}>
                Secure your free spot <span aria-hidden="true">↗</span>
              </button>
              <a className="text-link" href="#details">Explore event details <span aria-hidden="true">↓</span></a>
            </div>
            <p className="registration-note">
              <span className="status-dot" /> Admission is free. Registration is compulsory.
            </p>
          </div>

          <div className="flyer-wrap">
            <div className="theme-label">McPherson University Chapel of Praise</div>
            <div className="flyer-frame">
              <img src="/kairos-flyer.svg" alt="Official Kairos event flyer" />
            </div>
            <div className="date-stamp" aria-label="28 November 2026">
              <span>NOV</span>
              <strong>28</strong>
              <small>2026</small>
            </div>
          </div>
        </div>
      </section>

      <section className="countdown-band" aria-label="Countdown to KAIROS">
        <div>
          <p>The gathering begins in</p>
          <strong>Make room for the moment.</strong>
        </div>
        <div className="countdown">
          {[
            ["days", countdown.days],
            ["hours", countdown.hours],
            ["minutes", countdown.minutes],
            ["seconds", countdown.seconds],
          ].map(([label, value]) => (
            <div className="countdown-unit" key={String(label)}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section" id="about">
        <div className="section-label"><span>01</span> Why KAIROS</div>
        <h2>There is a time and a season for everything. <em>Could this be your appointed time</em> for an encounter with God?</h2>
        <div className="why-columns">
          <p>
            Don&apos;t just hear about what happened. Be part of what God is doing.
            Come hungry. Come expectant. Come ready.
          </p>
          <p>
            KAIROS is a full-day gathering for worship, prayer, spiritual reflection,
            and life-changing moments in God&apos;s presence.
          </p>
        </div>
      </section>

      <section className="details-section" id="details">
        <div className="details-heading">
          <p className="section-label light"><span>02</span> Event details</p>
          <h2>One day. One encounter.</h2>
          <p>Everything you need to know before you join us.</p>
        </div>
        <div className="detail-grid">
          <article className="detail-card featured">
            <CalendarIcon />
            <p>Saturday</p>
            <h3>28 November<br />2026</h3>
            <span>Set the day apart.</span>
          </article>
          <article className="detail-card">
            <ClockIcon />
            <p>From morning to evening</p>
            <h3>8:00 AM<br />— 4:00 PM</h3>
            <span>8:00 AM prompt.</span>
          </article>
          <article className="detail-card">
            <LocationIcon />
            <p>Stephen and Hannah Obaro Hall</p>
            <h3>McPherson<br />University</h3>
            <span>Come prepared.</span>
          </article>
        </div>
      </section>

      <section className="scripture-section">
        <span>Ecclesiastes 3:1</span>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <blockquote>
          “For everything there is a season, and a time for every matter under heaven.”
        </blockquote>
        <strong>IT&apos;S TIME. IT&apos;S KAIROS.</strong>
      </section>

      <section className="final-registration">
        <div>
          <p className="section-label orange">The room is waiting</p>
          <h2>Will you be in the room?</h2>
        </div>
        <div className="final-copy">
          <p>Admission is free. Registration is required. Every attendee should register.</p>
          <button className="button button-primary" type="button" onClick={register}>
            Register for Kairos <span aria-hidden="true">↗</span>
          </button>
          <small>Opens the official registration form.</small>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Return to the top">
          <BrandMark small />
          <span className="wordmark">
            <strong>KAIROS</strong>
            <small>God&apos;s appointed time</small>
          </span>
        </a>
        <p>McPherson University Chapel of Praise</p>
        <button type="button" onClick={register}>Register now ↗</button>
      </footer>
    </main>
  )
}
