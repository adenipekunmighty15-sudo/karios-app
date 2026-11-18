import { useEffect, useState } from "react"
import { initAnalytics, trackEvent } from "./analytics"

const REGISTRATION_URL = "https://forms.gle/SD2RkfVTwZcWujkw5"
const EVENT_START = new Date("2026-11-28T08:00:00+01:00").getTime()

type IconProps = { className?: string }

function KMark({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M6 8h11c7 0 11 3.6 11 9.2 0 4-2.2 7-5.8 8.3L30 40H18.2l-6.6-13.4H11V40H6V8Zm5 4.4v9.4h5.1c3.2 0 5-1.7 5-4.7s-1.8-4.7-5-4.7H11Z" fill="currentColor" />
    </svg>
  )
}

function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PinIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function useCountdown() {
  const getRemaining = () => {
    const diff = Math.max(0, EVENT_START - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [remaining, setRemaining] = useState(getRemaining)
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return remaining
}

export default function App() {
  const { days, hours, minutes, seconds } = useCountdown()

  useEffect(() => {
    initAnalytics()
  }, [])

  const trackRegistration = () => {
    trackEvent("registration_click", {
      registration_url: REGISTRATION_URL,
      event_name: "KAIROS",
    })
  }

  return (
    <div className="site">
      <header className="nav">
        <a className="brand" href="#top" aria-label="KAIROS — back to top">
          <span className="brand-mark"><KMark /></span>
          <span className="brand-copy">
            <strong>KAIROS</strong>
            <small>God&apos;s appointed time</small>
          </span>
        </a>
        <nav aria-label="Primary navigation" className="nav-links">
          <a href="#about">About</a>
          <a href="#details">Event details</a>
        </nav>
        <a className="btn btn-orange btn-sm" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
          Register now <ArrowIcon className="btn-arrow" />
        </a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> McPherson University Prays</p>
              <h1 id="hero-title" className="hero-title">
                KAIROS <em>— GOD&apos;S APPOINTED TIME!</em>
              </h1>
              <p className="hero-lead">
                Heaven has been whispering, and on the 28th, we gather to respond! 🔥
              </p>
              <p className="hero-lead">
                Join us at McPherson University Prays, as we gather in worship, prayer,
                intercession and an atmosphere of divine encounter.
              </p>
              <div className="hero-actions">
                <a className="btn btn-orange" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
                  Secure your free spot <ArrowIcon className="btn-arrow" />
                </a>
                <a className="btn btn-ghost" href="#details">See event details</a>
              </div>
              <p className="notice"><span className="status-dot" /> ADMISSION IS FREE. REGISTRATION IS COMPULSORY.</p>
            </div>

            <div className="flyer-shell">
              <div className="flyer-tilt">
                <div className="flyer-frame">
                  <img src="/kairos-flyer.jpg" alt="Official Kairos event flyer" className="flyer-image" />
                </div>
              </div>
              <div className="date-stamp" aria-hidden="true">
                <span>NOV</span>
                <strong>28</strong>
                <span>2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="countdown" aria-label="Countdown to KAIROS">
          <div className="container countdown-inner">
            <div className="countdown-copy">
              <p className="countdown-label">The gathering begins in</p>
              <p className="countdown-sub">Make room for the moment.</p>
            </div>
            <div className="countdown-units">
              {[
                { value: days, label: "Days" },
                { value: hours, label: "Hours" },
                { value: minutes, label: "Minutes" },
                { value: seconds, label: "Seconds" },
              ].map((unit) => (
                <div className="unit" key={unit.label}>
                  <span className="unit-value">{String(unit.value).padStart(2, "0")}</span>
                  <span className="unit-label">{unit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <div className="container">
            <p className="section-label">01 — Why KAIROS</p>
            <h2 id="about-title" className="about-title">
              There is a time and a season for everything. Could this be your appointed time for an encounter with God?
            </h2>
            <div className="about-columns">
              <div className="about-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>Don&apos;t just hear about what happened. Be part of what God is doing.</p>
                <p className="about-emphasis">Come hungry. Come expectant. Come ready!</p>
                <p className="about-small">Tell a friend to tell a friend 🥹🔥</p>
              </div>
              <div className="about-card">
                <span className="quote-mark" aria-hidden="true">“</span>
                <p>
                  KAIROS is a full-day gathering for worship, prayer, spiritual reflection and
                  life-changing moments in God&apos;s presence.
                </p>
                <p className="about-emphasis">
                  Join us at McPherson University Prays, as we gather in worship, prayer,
                  intercession and an atmosphere of divine encounter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="details" className="details" aria-labelledby="details-title">
          <div className="container">
            <p className="section-label section-label-light">02 — Event details</p>
            <h2 id="details-title" className="section-heading">One day. One encounter.</h2>
            <p className="section-intro">Everything you need to know before you join us.</p>
            <div className="detail-cards">
              <article className="detail-card card-cream">
                <CalendarIcon className="detail-icon" />
                <span className="detail-kicker">The day</span>
                <strong className="detail-main">28th November 2026</strong>
                <span className="detail-weekday">Saturday</span>
                <span className="detail-note">Set the day apart.</span>
              </article>
              <article className="detail-card card-solid">
                <ClockIcon className="detail-icon" />
                <span className="detail-kicker">The time</span>
                <strong className="detail-main">8:00 AM</strong>
                <span className="detail-weekday">until 4:00 PM</span>
                <span className="detail-note">8:00 AM prompt.</span>
              </article>
              <article className="detail-card card-solid">
                <PinIcon className="detail-icon" />
                <span className="detail-kicker">The place</span>
                <strong className="detail-main venue">Stephen and Hannah Obaro Hall</strong>
                <span className="detail-weekday">McPherson University</span>
                <span className="detail-note">Come with expectation.</span>
              </article>
            </div>
          </div>
        </section>

        <section className="scripture" aria-labelledby="scripture-title">
          <div className="container scripture-inner">
            <p className="section-label section-label-light">Ecclesiastes 3:1</p>
            <blockquote id="scripture-title">
              “For everything, there is a season, and a time for every matter under heaven.”
            </blockquote>
            <p className="scripture-declaration">— Ecclesiastes 3:1<br />IT&apos;S TIME. IT&apos;S KAIROS! 🔥</p>
          </div>
        </section>

        <section id="register" className="register" aria-labelledby="register-title">
          <div className="container register-inner">
            <div className="register-copy">
              <p className="section-label section-label-light">03 — Register</p>
              <h2 id="register-title">Will you be in the room?</h2>
              <p className="register-text">
                ADMISSION IS FREE. REGISTRATION IS COMPULSORY.
              </p>
              <p className="register-text">
                Register here: <a className="register-url" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>{REGISTRATION_URL}</a>
              </p>
              <a className="btn btn-orange btn-lg" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
                Register for Kairos <ArrowIcon className="btn-arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#top" aria-label="KAIROS — back to top">
            <span className="brand-mark"><KMark /></span>
            <span className="brand-copy">
              <strong>KAIROS</strong>
              <small>God&apos;s appointed time</small>
            </span>
          </a>
          <p className="footer-org">McPherson University Chapel of Praise</p>
          <a className="footer-link" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
            Register for KAIROS <ArrowIcon className="btn-arrow" />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>Saturday, 28th November 2026 · 8:00 AM – 4:00 PM</span>
        </div>
      </footer>
    </div>
  )
}
