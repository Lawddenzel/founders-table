"use client";
import { useState, useEffect } from "react";

const ROLES = [
  "Founder / Co-Founder",
  "Executive / C-Suite",
  "Entrepreneur",
  "Investor",
  "Business Professional",
  "Student",
  "Other",
];

const HEARD_FROM = [
  "Instagram",
  "LinkedIn",
  "WhatsApp",
  "Friend / Colleague",
  "Other",
];

export default function Home() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", businessName: "",
    role: "", industry: "", motivation: "", heardFrom: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [seats, setSeats] = useState<{ remaining: number; total: number } | null>(null);

  useEffect(() => {
    fetch("/api/rsvp").then(r => r.json()).then(d => setSeats(d));
  }, []);

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function submit() {
    setError("");
    const required = ["fullName", "email", "phone", "businessName", "role", "industry", "motivation", "heardFrom"];
    for (const f of required) {
      if (!form[f as keyof typeof form]) {
        setError("Please fill in all fields.");
        return;
      }
    }
    setSubmitting(true);
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSubmitted(true);
      setSeats(s => s ? { ...s, remaining: data.seatsRemaining, total: s.total + 1 } : s);
    } else {
      setError(data.error || "Something went wrong.");
    }
    setSubmitting(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", fontSize: "15px",
    border: "0.5px solid rgba(255,255,255,0.15)", borderRadius: "8px",
    background: "rgba(255,255,255,0.06)", color: "#fff",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "8px",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080C14", fontFamily: "-apple-system, BlinkMacSystemFont, 'DM Sans', sans-serif", color: "#fff" }}>

      {/* Hero */}
      <div style={{ position: "relative", padding: "80px 24px 60px", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(184,255,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>Unqo Digital & ASMBLY present</div>
        <div style={{ fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8FF00", marginBottom: "12px" }}>The</div>
        <h1 style={{ fontSize: "clamp(56px, 12vw, 96px)", fontWeight: "800", lineHeight: 1, margin: "0 0 8px", letterSpacing: "-2px" }}>Founders'</h1>
        <h1 style={{ fontSize: "clamp(56px, 12vw, 96px)", fontWeight: "800", lineHeight: 1, margin: "0 0 32px", letterSpacing: "-2px", color: "#B8FF00" }}>Table</h1>
        <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.6 }}>Challenging conventions. Shaping industries. Inspiring change.</p>

        {/* Event details */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
          {[
            { icon: "📅", label: "Thursday, 20 August 2026" },
            { icon: "📍", label: "Vinyls Music Café, Windhoek" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "100px", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        {seats && (
          <div style={{ fontSize: "13px", color: seats.remaining <= 10 ? "#ff6b6b" : "#B8FF00", marginTop: "16px" }}>
            {seats.remaining} of 40 seats remaining
          </div>
        )}
      </div>

      {/* Form */}
      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "0 24px 80px" }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "60px 40px", background: "rgba(184,255,0,0.05)", border: "0.5px solid rgba(184,255,0,0.2)", borderRadius: "16px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
            <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "12px" }}>You're on the list.</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Check your email for confirmation. We look forward to seeing you at Vinyls Music Café on 20 August.</p>
          </div>
        ) : (
          <div style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "40px 32px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>Reserve your seat</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>Limited to 40 attendees. Founders, executives, and change-makers only.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input value={form.fullName} onChange={e => update("fullName", e.target.value)} placeholder="Denzel Karupa" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@company.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+264 81 000 0000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Business Name / Organisation</label>
                <input value={form.businessName} onChange={e => update("businessName", e.target.value)} placeholder="Unqo Digital Solutions CC" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Your Role</label>
                <select value={form.role} onChange={e => update("role", e.target.value)} style={{ ...inputStyle, cursor: "pointer", colorScheme: "dark" }}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Industry</label>
                <input value={form.industry} onChange={e => update("industry", e.target.value)} placeholder="e.g. Technology, Real Estate, Finance" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>What brings you to the Founders' Table?</label>
                <textarea value={form.motivation} onChange={e => update("motivation", e.target.value)} placeholder="Tell us in 1-2 sentences..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              <div>
                <label style={labelStyle}>How did you hear about us?</label>
                <select value={form.heardFrom} onChange={e => update("heardFrom", e.target.value)} style={{ ...inputStyle, cursor: "pointer", colorScheme: "dark" }}>
                  <option value="">Select an option</option>
                  {HEARD_FROM.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>

              {error && <div style={{ fontSize: "13px", color: "#ff6b6b", padding: "12px 16px", background: "rgba(255,107,107,0.08)", borderRadius: "8px", border: "0.5px solid rgba(255,107,107,0.2)" }}>{error}</div>}

              <button onClick={submit} disabled={submitting} style={{ width: "100%", padding: "16px", fontSize: "14px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", background: submitting ? "rgba(184,255,0,0.5)" : "#B8FF00", color: "#0a0a0a", border: "none", borderRadius: "8px", cursor: submitting ? "not-allowed" : "pointer", transition: "opacity 0.2s" }}>
                {submitting ? "Submitting..." : "Reserve My Seat →"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", borderTop: "0.5px solid rgba(255,255,255,0.06)", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
        Founders' Table Namibia · Presented by Unqo Digital & ASMBLY · unqodigital.com
      </div>
    </div>
  );
}
