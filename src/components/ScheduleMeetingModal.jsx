import React, { useEffect, useState } from "react";
import { X, User, Phone, Mail, Briefcase, Loader2, MessageSquare } from "lucide-react";
import "./ScheduleMeetingModal.css";
import { submitToSheets } from "../utils/googleSheets";

const STORAGE_KEY = "dq_popup_submitted";

const ScheduleMeetingModal = ({ 
  isOpen, 
  onClose, 
  title = "Grow Your Business", 
  subtitle = "Free strategy call — no commitments.", 
  emoji = "🚀", 
  formType = "Schedule Meeting",
  showMessageField = false
}) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setNumber("");
    setEmail("");
    setCompanyName("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const { success, message: responseMsg } = await submitToSheets({
      formType,
      name,
      number,
      email,
      companyName,
      message: message || "N/A",
    });

    if (success) {
      setStatus("success");
      localStorage.setItem(STORAGE_KEY, "1");
    } else {
      setStatus("error");
      setErrorMsg(responseMsg || "Something went wrong");
    }
  };

  if (!showModal) return null;

  return (
    <div className="spm-overlay" onClick={handleClose}>
      <div className="spm-card" onClick={(e) => e.stopPropagation()}>
        <button className="spm-close" onClick={handleClose} aria-label="Close" type="button">
          <X size={18} />
        </button>

        {status === "success" ? (
  <div className="spm-success">
    <div className="spm-success-icon">🎉</div>
    <h3>We'll be in touch!</h3>
    <p>Thanks {name ? name.split(" ")[0] : "there"}! Our team will reach out within 24 hours.</p>

    <div style={{ display: "flex", gap: "10px", marginTop: "16px", justifyContent: "center" }}>
      <button
        className="spm-btn-skip"
        type="button"
        onClick={() => setStatus("idle")}
      >
        Back
      </button>

      <button className="spm-btn-primary" onClick={handleClose} type="button">
        Close
      </button>
    </div>
  </div>
) : (
          <>
            <div className="spm-header">
              <div className="spm-emoji">{emoji}</div>
              <h2 className="spm-title">{title}</h2>
              <p className="spm-sub">{subtitle}</p>
            </div>

            <form className="spm-form" onSubmit={handleSubmit}>
              <div className="spm-field">
                <div className="spm-input-wrap spm-name">
                  <User size={16} />
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="spm-field">
                <div className="spm-input-wrap spm-phone">
                  <Phone size={16} />
                  <input
                    type="tel"
                    placeholder="Number *"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="spm-field">
                <div className="spm-input-wrap spm-email">
                  <Mail size={16} />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="spm-field">
                <div className="spm-input-wrap spm-biz">
                  <Briefcase size={16} />
                  <input
                    type="text"
                    placeholder="Company Name *"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              {showMessageField && (
                <div className="spm-field">
                  <div className="spm-input-wrap spm-message">
                    <MessageSquare size={16} />
                    <textarea
                      placeholder="Project Requirements / Message *"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "loading"}
                    />
                  </div>
                </div>
              )}

              {status === "error" && <p className="spm-error">⚠️ {errorMsg}</p>}

              <div className="spm-actions">
                <button type="submit" className="spm-btn-primary" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="spm-spin" /> Sending...
                    </>
                  ) : (
                    "Get Free Consultation →"
                  )}
                </button>
                <button
                  type="button"
                  className="spm-btn-skip"
                  onClick={handleClose}
                  disabled={status === "loading"}
                >
                  Maybe Later
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleMeetingModal;