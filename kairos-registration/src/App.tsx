import { useEffect, useState } from "react"
import { initAnalytics, trackEvent } from "./analytics"

const REGISTRATION_URL = "https://forms.gle/SD2RkfVTwZcWujkw5"
const EMBEDDED_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSee4ZilAUoIqz7aP-HQgzqqbexDK8gE-s5XjEzrUpx4JIRUeQ/viewform?embedded=true"
const EVENT_START = new Date("2026-11-28T08:00:00+01:00").getTime()
const MINISTERS = [
  {
    name: "Pastor Paul Daniyan",
    image: "/minister-paul.jpg",
    description:
      "Join Pastor Paul Daniyan at Kairos for a day set apart to seek God in earnest prayer, worship and expectation.",
  },
  {
    name: "Pst. Joseph Nwigwe",
    image: "/minister-joseph.jpg",
    description:
      "Pst. Joseph Nwigwe will be one of the voices ministering as we respond to God’s call and make room for divine encounter.",
  },
  {
    name: "Rev. Ibwunmi Alo",
    image: "/minister-ibwunmi.jpg",
    description:
      "Rev. Ibwunmi Alo joins the ministering team for an unhurried gathering of intercession, worship and time in God’s presence.",
  },
]

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
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <header className="nav">
            <a className="brand" href="#top" aria-label="KAIROS — back to top">
              <span className="brand-mark"><KMark /></span>
              <span className="brand-copy">
                <strong>KAIROS</strong>
                <small>McPherson University Prays</small>
              </span>
            </a>
            <nav aria-label="Primary navigation" className="nav-links">
              <a href="#about">About</a>
              <a href="#ministers">Ministers</a>
              <a href="#details">Event details</a>
            </nav>
            <a className="btn btn-white btn-sm" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
              Register now <ArrowIcon className="btn-arrow" />
            </a>
          </header>
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Chapel of Praise presents</p>
              <h1 id="hero-title" className="hero-title">
                This is your <em>appointed time.</em>
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
              <div className="flyer-theme" aria-hidden="true">God&apos;s appointed time</div>
            </div>
          </div>
          <span className="scroll-cue" aria-hidden="true">Scroll to discover</span>
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
          <div className="container about-inner">
            <div className="section-index">
              <strong>01</strong>
              <span>Why KAIROS</span>
            </div>
            <div>
              <h2 id="about-title" className="about-title">
                There is a time and a season for everything. Could this be your appointed time for an encounter with God?
              </h2>
              <div className="about-columns">
                <p>
                  Don&apos;t just hear about what happened. Be part of what God is doing.
                  Come hungry. Come expectant. Come ready!
                  <strong>Tell a friend to tell a friend 🥹🔥</strong>
                </p>
                <p>
                  KAIROS is a full-day gathering for worship, prayer, spiritual reflection
                  and life-changing moments in God&apos;s presence.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="ministers" className="speakers" aria-labelledby="ministers-title">
          <div className="container">
            <div className="speakers-heading">
              <div className="section-index section-index-light">
                <strong>02</strong>
                <span>Meet the<br />ministers</span>
              </div>
              <div>
                <p className="speakers-eyebrow">Ministering at KAIROS</p>
                <h2 id="ministers-title" className="section-heading">Voices for the appointed moment.</h2>
              </div>
              <p className="speakers-intro">
                Three ministers. One gathering. A shared desire to see hearts awakened
                and lives transformed in God&apos;s presence.
              </p>
            </div>
            <div className="speaker-grid">
              {MINISTERS.map((minister, index) => (
                <article className="speaker-card" key={minister.name}>
                  <div className="speaker-photo">
                    <img src={minister.image} alt={minister.name} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="speaker-copy">
                    <p className="speaker-role">Ministering</p>
                    <h3 className="speaker-name">{minister.name}</h3>
                    <p className="speaker-description">{minister.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="speakers-outro">
              Together, they will minister through the flow of the gathering as we wait, pray and worship.
            </p>
          </div>
        </section>

        <section id="details" className="details" aria-labelledby="details-title">
          <div className="container">
            <div className="details-heading">
              <div>
                <p className="details-eyebrow">Save the date</p>
                <h2 id="details-title" className="section-heading">One day.<br />One encounter.</h2>
              </div>
              <p className="section-intro">Everything you need to know before you join us.</p>
            </div>
            <div className="detail-cards">
              <article className="detail-card card-cream">
                <CalendarIcon className="detail-icon" />
                <span className="detail-kicker">Date</span>
                <strong className="detail-main">Saturday,<br />28 November<br />2026</strong>
                <span className="detail-note">Set the day apart.</span>
              </article>
              <article className="detail-card card-solid">
                <ClockIcon className="detail-icon" />
                <span className="detail-kicker">Time</span>
                <strong className="detail-main">8:00 AM<br />to 4:00 PM</strong>
                <span className="detail-note">8:00 AM prompt.</span>
              </article>
              <article className="detail-card card-solid">
                <PinIcon className="detail-icon" />
                <span className="detail-kicker">Venue</span>
                <strong className="detail-main venue">Stephen &amp; Hannah<br />Obaro Hall</strong>
                <span className="detail-note">McPherson University</span>
              </article>
            </div>
          </div>
        </section>

        <section className="scripture" aria-labelledby="scripture-title">
          <div className="orbit orbit-a" aria-hidden="true" />
          <div className="orbit orbit-b" aria-hidden="true" />
          <div className="orbit orbit-c" aria-hidden="true" />
          <div className="container scripture-inner">
            <p className="scripture-eyebrow">Ecclesiastes 3:1</p>
            <blockquote id="scripture-title">
              “For everything there is a season, and a time for every matter under heaven.”
            </blockquote>
            <p className="scripture-declaration">IT&apos;S TIME. IT&apos;S KAIROS! 🔥</p>
          </div>
        </section>

        <section id="register" className="register" aria-labelledby="register-title">
          <div className="register-glow" aria-hidden="true" />
          <div className="container register-inner">
            <div className="register-copy">
              <p className="register-eyebrow">Your place is waiting</p>
              <h2 id="register-title">Will you be in the room?</h2>
              <p className="register-text">
                Admission is free. Registration is required. Every attendee should register.
              </p>
              <ol className="register-steps">
                <li><span>01</span> Complete the official registration form</li>
                <li><span>02</span> Submit your response</li>
                <li><span>03</span> Come ready for your appointed time</li>
              </ol>
              <a className="btn btn-orange btn-lg" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
                Register for Kairos <ArrowIcon className="btn-arrow" />
              </a>
              <p className="register-note">Opens the official registration form in a new tab.</p>
            </div>
            <div className="form-card">
              <div className="form-card-head">
                <span className="form-dot" aria-hidden="true" />
                <strong>Official registration</strong>
                <a href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>Secure form ↗</a>
              </div>
              <div className="form-frame">
                <iframe title="Official KAIROS registration form" src={EMBEDDED_FORM_URL} loading="lazy" />
              </div>
              <a className="form-fallback" href={REGISTRATION_URL} target="_blank" rel="noopener noreferrer" onClick={trackRegistration}>
                Form not displaying? <strong>Open it in a new tab <ArrowIcon className="btn-arrow" /></strong>
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
