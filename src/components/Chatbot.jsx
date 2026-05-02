import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot,
  X,
  Send,
  Phone,
  Mail,
  FileText,
  ChevronLeft,
  Sparkles,
  MessageCircle,
  Globe,
  RefreshCw,
  Loader2,
} from "lucide-react";

const COMPANY = {
  name: "DigiQlik",
  email: "digiqlik@info.com",
  phone: "+91 9217644096",
  location: "B-37, Sector 62, Noida, India",
};

const DEFAULT_SUGGESTIONS = [
  "What services do you offer?",
  "Show me your portfolio",
  "What is your pricing?",
  "How can I get a free audit?",
];

const QUICK_ACTIONS = [
  { key: "call", label: "Call Now", icon: Phone },
  { key: "email", label: "Email Us", icon: Mail },
  { key: "form", label: "Submit Query", icon: FileText },
];

const styles = `
.chatbot-wrapper{position:fixed;bottom:16px;right:24px;z-index:999999;pointer-events:none;display:flex;flex-direction:column;align-items:flex-end;gap:12px}
.chatbot-tooltip{position:absolute;right:72px;bottom:12px;background:#fff;color:#111827;padding:10px 14px;border-radius:999px;font-size:.88rem;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,.12);border:1px solid rgba(0,0,0,.05);opacity:0;transform:translateX(18px);transition:all .35s ease;white-space:nowrap}
.chatbot-tooltip.visible{opacity:1;transform:translateX(0)}
.chatbot-toggle{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#E4403B,#c0392b);color:#fff;border:none;box-shadow:0 10px 24px rgba(228,64,59,.35);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .25s ease,box-shadow .25s ease;position:relative;pointer-events:auto}
.chatbot-toggle:hover{transform:scale(1.06);box-shadow:0 14px 32px rgba(228,64,59,.45)}
.chatbot-toggle.open{background:#334155}
.chatbot-notification-dot{position:absolute;top:12px;right:12px;width:10px;height:10px;background:#ef4444;border-radius:50%;border:2px solid #E4403B}
.chatbot-pulse-ring{position:absolute;width:calc(100% + 4px);height:calc(100% + 4px);border-radius:50%;border:2px solid rgba(228,64,59,.8);top:-2px;left:-2px;animation:chatbotPulse 2s infinite;z-index:-1}
.chatbot-toggle.open .chatbot-pulse-ring{display:none}
@keyframes chatbotPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.65);opacity:0}}
.chatbot-window{width:380px;max-width:calc(100vw - 48px);height:560px;max-height:calc(100vh - 120px);background:#fff;border-radius:22px;box-shadow:0 18px 50px rgba(15,23,42,.24);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(24px) scale(.96);pointer-events:none;transition:all .3s ease;position:absolute;bottom:72px;right:0}
.chatbot-window.active{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
.chatbot-header{background:linear-gradient(135deg,#E4403B,#c0392b);color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between}
.chatbot-header-brand{display:flex;align-items:center;gap:12px}
.chatbot-avatar{width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.back-btn,.reset-btn{background:rgba(255,255,255,.16);border:none;color:#fff;width:32px;height:32px;border-radius:10px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.chatbot-header-info h3{margin:0;font-size:1rem;font-weight:700}
.chatbot-header-info p{margin:3px 0 0;font-size:.75rem;opacity:.9}
.chatbot-body{flex:1;background:#f8fafc;padding:16px;overflow-y:auto}
.chatbot-messages{display:flex;flex-direction:column;gap:14px}
.message-container{max-width:88%;display:flex;flex-direction:column}
.message-container.bot{align-self:flex-start}
.message-container.user{align-self:flex-end;align-items:flex-end}
.message-bubble{padding:11px 14px;border-radius:16px;font-size:.9rem;line-height:1.5;word-break:break-word}
.bot .message-bubble{background:#fff;color:#0f172a;border-bottom-left-radius:4px;box-shadow:0 2px 8px rgba(15,23,42,.06)}
.user .message-bubble{background:linear-gradient(135deg,#E4403B,#c0392b);color:#fff;border-bottom-right-radius:4px}
.message-bubble p{margin:0}
.suggestion-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.suggestion-chip{border:1px solid rgba(228,64,59,.15);background:#fff1f0;color:#E4403B;padding:7px 11px;border-radius:999px;font-size:.78rem;font-weight:600;cursor:pointer;transition:transform .2s ease,background .2s ease}
.suggestion-chip:hover{transform:translateY(-1px);background:rgba(228,64,59,0.08)}
.message-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.action-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 12px;font-size:.8rem;font-weight:700;border-radius:999px;border:1px solid transparent;cursor:pointer}
.action-btn.call{background:rgba(16,185,129,.12);color:#059669}
.action-btn.email{background:rgba(228,64,59,.12);color:#E4403B}
.action-btn.form{background:rgba(45,62,80,.12);color:#2D3E50}
.typing{display:inline-flex;gap:5px;align-items:center;min-width:52px}
.typing span{width:7px;height:7px;background:#94a3b8;border-radius:50%;animation:typingBounce 1s infinite ease-in-out}
.typing span:nth-child(2){animation-delay:.15s}
.typing span:nth-child(3){animation-delay:.3s}
@keyframes typingBounce{0%,80%,100%{transform:translateY(0);opacity:.5}40%{transform:translateY(-4px);opacity:1}}
.smart-hints{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;margin-bottom:10px}
.smart-hints span{display:inline-flex;align-items:center;gap:6px;font-size:.74rem;color:#64748b;background:#fff;border:1px solid #e2e8f0;padding:6px 10px;border-radius:999px}
.quick-actions-strip{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.quick-action{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;border:1px solid #e2e8f0;background:#fff;font-size:.78rem;font-weight:700;color:#334155;cursor:pointer}
.chatbot-footer{background:#fff;border-top:1px solid #e2e8f0;padding:10px 12px}
.chatbot-input-form{display:flex;align-items:center;gap:10px;background:#f1f5f9;border-radius:999px;padding:7px 7px 7px 12px}
.chatbot-input{flex:1;border:none;background:transparent;font-size:.9rem;color:#0f172a;min-width:0;outline:none}
.chatbot-input::placeholder{color:#94a3b8}
.chatbot-send-btn{width:36px;height:36px;border-radius:50%;border:none;background:transparent;color:#94a3b8;display:flex;align-items:center;justify-content:center;cursor:not-allowed}
.chatbot-send-btn.active{background:#E4403B;color:#fff;cursor:pointer}
.chatbot-send-btn.active:hover{background:#C5302B}
.animate-fade{animation:fadeUp .25s ease-out}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.lead-box{min-height:100%;display:flex;align-items:center;justify-content:center}
.success-card{width:100%;text-align:center;background:#fff;border-radius:18px;padding:26px 18px;box-shadow:0 8px 24px rgba(15,23,42,.08)}
.success-card svg{margin:0 auto 10px;color:#E4403B}
.success-card h3{margin:0 0 8px;color:#0f172a;font-size:1.15rem}
.success-card p{margin:0 0 18px;color:#64748b;font-size:.92rem}
.submit-btn{width:100%;background:linear-gradient(135deg,#E4403B,#c0392b);color:#fff;border:none;padding:11px 14px;border-radius:12px;font-weight:700;cursor:pointer}
.form-stack{display:grid;gap:10px}
.form-field{display:grid;gap:6px}
.form-field label{font-size:.8rem;font-weight:700;color:#334155}
.form-field input,.form-field textarea{width:100%;border:1px solid #cbd5e1;border-radius:12px;padding:10px 12px;font:inherit;outline:none;background:#fff}
.form-field input:focus,.form-field textarea:focus{border-color:#E4403B;box-shadow:0 0 0 3px rgba(228,64,59,.12)}
@media (max-width:480px){.chatbot-wrapper{right:14px;bottom:12px}.chatbot-toggle{width:54px;height:54px}.chatbot-window{width:calc(100vw - 28px);max-width:none;height:calc(100dvh - 106px);bottom:66px;border-radius:18px 18px 0 0}.chatbot-tooltip{right:62px;font-size:.78rem;padding:8px 12px}}
@media (max-width:360px){.chatbot-toggle{width:50px;height:50px}.chatbot-window{bottom:62px}}
`;

function getISTHour() {
  const hour = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
  }).format(new Date());
  return Number(hour);
}

function getGreeting() {
  const hour = getISTHour();
  if (hour >= 5 && hour < 12) return { text: "Good morning", emoji: "🌅" };
  if (hour >= 12 && hour < 17) return { text: "Good afternoon", emoji: "☀️" };
  if (hour >= 17 && hour < 21) return { text: "Good evening", emoji: "🌇" };
  return { text: "Hello", emoji: "👋" };
}

function detectLanguage(text) {
  const value = text.toLowerCase();
  if (/[\u0900-\u097F]/.test(text)) return "hi";
  const hinglishWords = [
    "kya", "kaise", "kaisa", "kitna", "batao", "price", "pricing",
    "services", "website", "app", "seo", "marketing", "audit", "portfolio"
  ];
  if (hinglishWords.some((w) => value.includes(w))) return "hinglish";
  return "en";
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildReply(language, en, hi, hinglish) {
  if (language === "hi") return hi;
  if (language === "hinglish") return hinglish;
  return en;
}

function localKnowledgeBase(rawText) {
  const query = normalize(rawText);

  const greetingMatch =
    /^(hi|hello|hey|hii|helo|good morning|good afternoon|good evening|namaste|namaskar)\b/.test(query);

  if (greetingMatch) {
    const g = getGreeting();
    return {
      reply: buildReply(
        detectLanguage(rawText),
        `${g.text} 👋 I’m the DigiQlik assistant. I can help with services, pricing, portfolio, process, free audit, and contact details.`,
        `${g.text} 👋 Main DigiQlik assistant hoon. Main services, pricing, portfolio, process, free audit aur contact details mein help kar sakta hoon.`,
        `${g.text} 👋 Main DigiQlik assistant hoon. Aap services, pricing, portfolio, process, free audit ya contact details pooch sakte ho.`
      ),
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  if (query.includes("service") || query.includes("services") || query.includes("kya karte") || query.includes("kaam")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "DigiQlik offers digital marketing, performance marketing, web development, app development, graphic design, video production, SEO, and branding strategy. Tell me your goal and I’ll suggest the best service mix.",
        "DigiQlik digital marketing, performance marketing, web development, app development, graphic design, video production, SEO aur branding strategy offer karta hai. Apna goal batayein, main best service mix suggest kar dunga.",
        "DigiQlik digital marketing, performance marketing, web development, app development, graphic design, video production, SEO aur branding strategy offer karta hai. Apna goal batao, main best service mix suggest kar dunga."
      ),
      suggestions: ["Show me portfolio", "Ask about pricing", "Need a free audit"],
    };
  }

  if (query.includes("portfolio") || query.includes("work") || query.includes("project") || query.includes("case study")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "Yes — we have work across agency websites, real estate, e-commerce, CRM, school portals, animations, and high-conversion landing pages.",
        "Haan — humne agency websites, real estate, e-commerce, CRM, school portals, animations aur high-conversion landing pages par kaam kiya hai.",
        "Haan — humne agency websites, real estate, e-commerce, CRM, school portals, animations aur high-conversion landing pages par kaam kiya hai."
      ),
      suggestions: ["Ask about web development", "Ask about SEO", "Get pricing"],
    };
  }

  if (query.includes("pricing") || query.includes("price") || query.includes("cost") || query.includes("budget") || query.includes("quote") || query.includes("kitna") || query.includes("daam")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "Pricing depends on scope, pages, features, integrations, and urgency. A simple business website is priced differently from a CRM, e-commerce, or custom app. Share your goal and I’ll guide you to the right budget range.",
        "Pricing scope, pages, features, integrations aur urgency par depend karta hai. Simple business website ki pricing CRM, e-commerce ya custom app se alag hogi. Aap apna goal share karein, main sahi budget range bata dunga.",
        "Pricing scope, pages, features, integrations aur urgency par depend karta hai. Simple business website ki pricing CRM, e-commerce ya custom app se alag hogi. Aap goal share karo, main sahi budget range bata dunga."
      ),
      suggestions: ["Tell me your project", "Free audit please", "Contact details"],
    };
  }

  if (query.includes("audit") || query.includes("analysis") || query.includes("review")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "Absolutely — we can review your website or business idea and suggest improvements for design, SEO, conversion, and lead generation. Share your website link or a short brief.",
        "Bilkul — hum aapki website ya business idea ka review karke design, SEO, conversion aur lead generation ke liye improvements suggest kar sakte hain. Website link ya short brief bhejiye.",
        "Bilkul — hum aapki website ya business idea ka review karke design, SEO, conversion aur lead generation ke liye improvements suggest kar sakte hain. Website link ya short brief bhejo."
      ),
      suggestions: ["Show contact details", "Ask about SEO", "Start a project"],
    };
  }

  if (query.includes("process") || query.includes("how to start") || query.includes("get started") || query.includes("timeline") || query.includes("steps")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "Our process is simple: discovery, planning, execution, and optimization. First we understand your goal, then we plan the structure, build the solution, and keep improving after launch.",
        "Hamari process simple hai: discovery, planning, execution aur optimization. Pehle hum aapka goal samajhte hain, phir structure plan karte hain, solution build karte hain, aur launch ke baad improve karte rehte hain.",
        "Hamari process simple hai: discovery, planning, execution aur optimization. Pehle goal samajhte hain, phir structure plan karte hain, solution build karte hain, aur launch ke baad improve karte rehte hain."
      ),
      suggestions: ["Need a website?", "Need an app?", "Need SEO?"],
    };
  }

  if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("location") || query.includes("address")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        `You can reach DigiQlik at ${COMPANY.phone}, ${COMPANY.email}, or visit us at ${COMPANY.location}.`,
        `Aap DigiQlik se ${COMPANY.phone}, ${COMPANY.email}, ya ${COMPANY.location} par contact kar sakte hain.`,
        `Aap DigiQlik se ${COMPANY.phone}, ${COMPANY.email}, ya ${COMPANY.location} par contact kar sakte hain.`
      ),
      suggestions: ["Free audit", "Ask about services", "Show portfolio"],
    };
  }

  if (query.includes("seo") || query.includes("rank") || query.includes("google")) {
    return {
      reply: buildReply(
        detectLanguage(rawText),
        "We provide SEO strategy, technical SEO, on-page optimization, local SEO, content planning, and performance monitoring to improve visibility and leads.",
        "Hum SEO strategy, technical SEO, on-page optimization, local SEO, content planning aur performance monitoring provide karte hain taaki visibility aur leads improve ho.",
        "Hum SEO strategy, technical SEO, on-page optimization, local SEO, content planning aur performance monitoring provide karte hain taaki visibility aur leads improve ho."
      ),
      suggestions: ["Ask about content", "Ask about website", "Get a free audit"],
    };
  }

  return null;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormMode, setIsFormMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showGreetingTooltip, setShowGreetingTooltip] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [formStatus, setFormStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const messagesEndRef = useRef(null);
  const autoCloseTimerRef = useRef(null);

  const greeting = useMemo(() => getGreeting(), []);

  const initialMessage = useMemo(
    () => ({
      id: 1,
      sender: "bot",
      text:
        `${greeting.text} ${greeting.emoji} I’m DigiQlik Assistant. ` +
        "I can help in English, Hindi, and Hinglish. Ask me about services, pricing, portfolio, process, free audit, or contact details.",
      type: "text",
      suggestions: DEFAULT_SUGGESTIONS,
    }),
    [greeting]
  );

  useEffect(() => {
    setMessages([initialMessage]);
  }, [initialMessage]);

  useEffect(() => {
    const tooltipTimer = setTimeout(() => setShowGreetingTooltip(true), 1400);

    return () => {
      clearTimeout(tooltipTimer);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping, isFormMode]);

  const pushBotMessage = (text, suggestions = DEFAULT_SUGGESTIONS) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender: "bot",
        text,
        type: "text",
        suggestions,
      },
    ]);
  };

  const askAI = async (conversation, userText, language) => {
    const payload = {
      userMessage: userText,
      language,
      company: COMPANY,
      conversation: conversation.slice(-10).map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
      system:
        "You are DigiQlik's website assistant. Be warm, human, professional, concise, and helpful. Reply in the user's language if possible: English, Hindi, or Hinglish. Give one useful next step or suggestion.",
    };

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Chatbot endpoint failed: ${res.status}`);

    const data = await res.json();
    return {
      reply: data?.reply || "Thanks for your message. Please share a little more detail.",
      suggestions: Array.isArray(data?.suggestions) && data.suggestions.length ? data.suggestions : DEFAULT_SUGGESTIONS,
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const raw = inputValue.trim();
    if (!raw) return;

    setHasInteracted(true);
    setShowGreetingTooltip(false);

    const language = detectLanguage(raw);
    const userMsg = { id: Date.now(), sender: "user", text: raw, type: "text" };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const local = localKnowledgeBase(raw);

    try {
      if (local) {
        await new Promise((r) => setTimeout(r, 250));
        pushBotMessage(local.reply, local.suggestions);
      } else {
        const ai = await askAI([...messages, userMsg], raw, language);
        pushBotMessage(ai.reply, ai.suggestions);
      }
    } catch {
      pushBotMessage(
        "I’m having a small connection issue right now, but I can still help. Please ask about services, pricing, portfolio, free audit, or contact details.",
        DEFAULT_SUGGESTIONS
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickSuggestion = (text) => {
    setInputValue(text);
    requestAnimationFrame(() => {
      document.getElementById("chatbot-input-form")?.requestSubmit?.();
    });
  };

  const handleActionClick = (actionType) => {
    setHasInteracted(true);
    setShowGreetingTooltip(false);

    if (actionType === "call") window.location.href = `tel:${COMPANY.phone.replace(/\s+/g, "")}`;
    if (actionType === "email") window.location.href = `mailto:${COMPANY.email}`;
    if (actionType === "form") {
      setIsFormMode(true);
      setFormStatus("idle");
    }
  };

  const toggleChatbot = () => {
    setHasInteracted(true);
    setShowGreetingTooltip(false);
    setIsOpen((prev) => !prev);
  };

  const openFreshChat = () => {
    setMessages([initialMessage]);
    setIsTyping(false);
    setIsFormMode(false);
    setInputValue("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "chatbot" }),
      });

      if (!res.ok) throw new Error("Lead submit failed");

      setFormStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="chatbot-wrapper">
        <div className={`chatbot-tooltip ${!isOpen && showGreetingTooltip ? "visible" : ""}`}>
          Need help? Ask me anything ✨
        </div>

        <button className={`chatbot-toggle ${isOpen ? "open" : ""}`} onClick={toggleChatbot} aria-label="Toggle Support Chat">
          {isOpen ? <X size={24} /> : <Bot size={26} />}
          {!hasInteracted && <span className="chatbot-notification-dot" />}
          <span className="chatbot-pulse-ring" />
        </button>

        <div className={`chatbot-window ${isOpen ? "active" : ""}`}>
          <div className="chatbot-header">
            <div className="chatbot-header-brand">
              {isFormMode ? (
                <button className="back-btn" onClick={() => setIsFormMode(false)} aria-label="Back">
                  <ChevronLeft size={18} />
                </button>
              ) : (
                <div className="chatbot-avatar">
                  <Bot size={18} />
                </div>
              )}
              <div className="chatbot-header-info">
                <h3>{isFormMode ? "Submit Query" : `${COMPANY.name} Support`}</h3>
                <p>{isFormMode ? "Tell us your requirement" : "Online • English / Hindi / Hinglish"}</p>
              </div>
            </div>

            {!isFormMode && (
              <button className="reset-btn" onClick={openFreshChat} title="Restart chat">
                <RefreshCw size={16} />
              </button>
            )}
          </div>

          <div className="chatbot-body">
            {isFormMode ? (
              formStatus === "success" ? (
                <div className="lead-box animate-fade">
                  <div className="success-card">
                    <Sparkles size={34} />
                    <h3>Message sent successfully</h3>
                    <p>We’ll check your requirement and get back to you soon.</p>
                    <button className="submit-btn" onClick={() => setIsFormMode(false)}>
                      Back to Chat
                    </button>
                  </div>
                </div>
              ) : (
                <form className="form-stack animate-fade" onSubmit={handleFormSubmit}>
                  <div className="form-field">
                    <label>Name</label>
                    <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your name" required />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="you@example.com" required />
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea rows={4} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project" required />
                  </div>

                  {formStatus === "error" && (
                    <p style={{ color: "#ef4444", fontSize: "0.85rem", margin: 0 }}>Something went wrong. Please try again.</p>
                  )}

                  <button type="submit" className="submit-btn" disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )
            ) : (
              <>
                <div className="chatbot-messages">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`message-container ${msg.sender}`}>
                      <div className="message-bubble">
                        <p>{msg.text}</p>
                      </div>

                      {msg.sender === "bot" && msg.suggestions?.length ? (
                        <div className="suggestion-row">
                          {msg.suggestions.slice(0, 3).map((s) => (
                            <button key={s} className="suggestion-chip" onClick={() => handleQuickSuggestion(s)}>
                              {s}
                            </button>
                          ))}
                        </div>
                      ) : null}

                      {msg.type === "action" && (
                        <div className="message-actions">
                          {QUICK_ACTIONS.map((action) => {
                            const Icon = action.icon;
                            return (
                              <button key={action.key} onClick={() => handleActionClick(action.key)} className={`action-btn ${action.key}`}>
                                <Icon size={14} /> {action.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="message-container bot">
                      <div className="message-bubble typing">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="smart-hints">
                  <span><Globe size={14} /> Hindi • English • Hinglish supported</span>
                  <span><MessageCircle size={14} /> Try: pricing, services, portfolio</span>
                </div>

                <div className="quick-actions-strip">
                  {QUICK_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button key={action.key} className="quick-action" onClick={() => handleActionClick(action.key)}>
                        <Icon size={14} />
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {!isFormMode && (
            <div className="chatbot-footer">
              <form id="chatbot-input-form" onSubmit={handleSendMessage} className="chatbot-input-form">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (!hasInteracted) setHasInteracted(true);
                  }}
                  placeholder="Ask anything... e.g. services, pricing, portfolio"
                  className="chatbot-input"
                  autoComplete="off"
                />
                <button type="submit" className={`chatbot-send-btn ${inputValue.trim() ? "active" : ""}`} disabled={!inputValue.trim()}>
                  <Send size={17} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}