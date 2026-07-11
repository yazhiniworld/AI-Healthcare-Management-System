import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaRobot, FaVideo, FaCalendarAlt, FaHeartbeat, FaShieldAlt, FaEnvelope, FaUsers, FaMicrophoneAlt } from "react-icons/fa";
import doctorService from "../services/doctorService";
import feedService from "../services/feedService";
import testimonialService from "../services/testimonialService";
import contactService from "../services/contactService";
import "./Landing.css";

function Landing() {
  const [doctors, setDoctors] = useState([]);
  const [feed, setFeed] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [doctorsData, feedData, testimonialsData] = await Promise.all([
          doctorService.getAllDoctors(),
          feedService.getFeed(),
          testimonialService.getTestimonials(),
        ]);

        setDoctors(doctorsData);
        setFeed(feedData);
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Landing content load failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const featuredDoctors = useMemo(
    () => doctors.slice(0, 6),
    [doctors]
  );

  const [contact, setContact] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactResult, setContactResult] = useState("");

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactService.sendContactMessage(contact);
      setContactResult("Thanks! Your message has been sent.");
      setContact({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setContactResult("Unable to send message. Please try again.");
    }
  };

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <div className="landing-brand">
          <span>HealthPlus</span>
        </div>
        <nav className="landing-links">
          <a href="#home">Home</a>
          <a href="#doctors">Doctors</a>
          <a href="#ai">AI</a>
          <a href="#feed">Health Feed</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/login">Login</Link>
          <Link to="/register" className="primary-pill">Register</Link>
        </nav>
      </header>

      <section className="landing-hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Intelligent Healthcare Platform</p>
          <h1>Fast, secure, AI-powered care for modern hospitals.</h1>
          <p>
            Manage patients, appointments, doctors, and virtual care with
            one unified platform built for healthcare teams and patients.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="primary-btn">Start for free</Link>
            <a href="#about" className="secondary-btn">See platform</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card glass-card">
            <div className="hero-card-tag">
              <FaHeartbeat /> Trusted by clinics worldwide
            </div>
            <h2>Smart medical operations with AI guidance.</h2>
            <p>Schedule consultations, approve specialists, and route patients automatically.</p>
          </div>
        </div>
      </section>

      <section className="landing-stats glass-card">
        <div>
          <h2>Trusted by clinical leaders</h2>
          <p>Designed for hospital administrators, doctors, and patients who need a responsive digital care command center.</p>
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <span>98%</span>
            <p>Patient satisfaction</p>
          </div>
          <div className="stat-card">
            <span>9.8/10</span>
            <p>Doctor workflow efficiency</p>
          </div>
          <div className="stat-card">
            <span>24/7</span>
            <p>AI-enabled clinical insights</p>
          </div>
        </div>
      </section>

      <section className="landing-features" id="ai">
        <div className="section-heading">
          <p className="eyebrow">AI features</p>
          <h2>Automation, insights, and next-gen care workflows.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>Clinical intelligence</h3>
            <p>AI summaries help staff triage patients faster and reduce administrative overload.</p>
          </article>
          <article className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Secure records</h3>
            <p>Protected patient and doctor data across every consultation and appointment.</p>
          </article>
          <article className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Smart scheduling</h3>
            <p>Use AI-driven booking to match patients with the right doctor and availability.</p>
          </article>
          <article className="feature-card">
            <FaVideo className="feature-icon" />
            <h3>Video consultations</h3>
            <p>Run virtual visits and follow-ups using integrated telehealth workflows.</p>
          </article>
        </div>
      </section>

      <section className="landing-solutions">
        <div className="solution-panel glass-card">
          <div className="solution-badge">
            <FaMicrophoneAlt /> Voice Assistant
          </div>
          <h3>Hands-free assistant</h3>
          <p>Quickly search schedules, patient summaries, and appointment status using natural language.</p>
        </div>
        <div className="solution-panel glass-card">
          <div className="solution-badge">
            <FaVideo />
            Video Consultation
          </div>
          <h3>Virtual care hub</h3>
          <p>Deliver remote consultations, send reports, and keep care on schedule.</p>
        </div>
        <div className="solution-panel glass-card">
          <div className="solution-badge">
            <FaCalendarAlt />
            Online Appointment
          </div>
          <h3>Patient booking</h3>
          <p>Make appointment requests easy and transparent for patients and staff alike.</p>
        </div>
      </section>

      <section className="landing-directory" id="doctors">
        <div className="section-heading">
          <p className="eyebrow">Doctor directory</p>
          <h2>Connect with verified specialists instantly.</h2>
        </div>
        {loading ? (
          <p className="loading-text">Loading doctors...</p>
        ) : featuredDoctors.length === 0 ? (
          <p className="empty-text">No doctors available yet. Register to add specialists.</p>
        ) : (
          <div className="doctor-grid">
            {featuredDoctors.map((doctor) => (
              <article className="doctor-card" key={doctor.id}>
                <div className="doctor-card-header">
                  <div className="doctor-avatar">{doctor.name?.charAt(0)}</div>
                  <div>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialization}</p>
                  </div>
                </div>
                <div className="doctor-card-body">
                  <p>{doctor.experience} years experience</p>
                  <p>{doctor.phone}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="landing-panel" id="feed">
        <div className="panel-copy">
          <p className="eyebrow">Health feed</p>
          <h2>Latest hospital insights and care guidance.</h2>
          <p>All feed content is driven from the backend so your team stays on top of the latest care updates.</p>
        </div>
        <div className="feed-grid">
          {feed.map((item) => (
            <article className="feed-card" key={item.postId}>
              <div className="feed-card-meta">{item.category} · {item.publishedAt}</div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-testimonials">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>Hospital teams love HealthPlus.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.testimonialId}>
              <p className="quote">“{item.quote}”</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.name?.charAt(0)}</div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role} · {item.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-faq" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Built for healthcare teams and patient experience.</h2>
        </div>
        <div className="faq-grid">
          <div className="faq-card">
            <h4>How does verification work?</h4>
            <p>Doctors submit credentials and certificates during registration. Admins review and approve before the doctor can access the platform.</p>
          </div>
          <div className="faq-card">
            <h4>Can patients book online?</h4>
            <p>Yes. Patients can request appointments, view available specialists, and receive secure follow-up communication.</p>
          </div>
          <div className="faq-card">
            <h4>Is patient data secure?</h4>
            <p>All records are managed in the backend and stored securely in MySQL with access controlled by user roles.</p>
          </div>
          <div className="faq-card">
            <h4>How do AI features help?</h4>
            <p>HealthPlus provides scheduling guidance, workflow summaries, and automated care recommendations for staff.</p>
          </div>
        </div>
      </section>

      <section className="landing-contact" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Start modernizing your healthcare operations.</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-copy glass-card">
            <h3>Ready for a live demo?</h3>
            <p>Register today and bring AI-driven patient care into your facility.</p>
            <div className="contact-meta">
              <div><FaEnvelope /> support@healthplus.com</div>
              <div><FaUsers /> 24/7 Care team</div>
            </div>
          </div>
          <form className="contact-card glass-card" onSubmit={handleContactSubmit}>
            <h3>Send us a message</h3>
            <label>Name</label>
            <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required />
            <label>Email</label>
            <input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
            <label>Subject</label>
            <input value={contact.subject} onChange={(e) => setContact({ ...contact, subject: e.target.value })} required />
            <label>Message</label>
            <textarea value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} rows="4" required />
            <button type="submit" className="primary-btn">Send Message</button>
            {contactResult && <p className="contact-result">{contactResult}</p>}
          </form>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <p>HealthPlus</p>
          <span>AI Healthcare Management System</span>
        </div>
        <span>© {new Date().getFullYear()} HealthPlus. All rights reserved.</span>
      </footer>
    </main>
  );
}

export default Landing;
