
import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { submitToSheets } from "../utils/googleSheets";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

  const { success, message } = await submitToSheets({
  formType: "Contact",
  name: form.name,
  email: form.email,
  phone: form.phone,
  message: form.message,
});

    if (success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(message);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Start Your Project</h2>
          <p className="section-subtitle">
            Ready to transform your digital presence? Reach out and let's create
            something amazing together
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-blocks">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@digiqlik.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 9217644096</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>B-37, Sector 62, Noida, India</p>
                </div>
              </div>
            </div>

            <div className="why-choose-us">
              <h3>Why Choose Us?</h3>
              <ul className="benefits-list">
                <li>
                  <CheckCircle size={20} color="#E4403B" /> Expert team with 15+
                  years experience
                </li>
                <li>
                  <CheckCircle size={20} color="#E4403B" /> Proven track record
                  of success
                </li>
                <li>
                  <CheckCircle size={20} color="#E4403B" /> Personalized
                  approach to every project
                </li>
                <li>
                  <CheckCircle size={20} color="#E4403B" /> 24/7 dedicated
                  support
                </li>
              </ul>
            </div>
          </div>

          <div className="contact-form-container card">
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <CheckCircle size={56} color="#22c55e" style={{ margin: "0 auto 1rem" }} />
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus("idle")}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us about your project"
                    required
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                  ></textarea>
                </div>

                {status === "error" && (
                  <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                    ⚠️ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-submit"
                  disabled={status === "loading"}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
