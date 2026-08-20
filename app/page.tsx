"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const navy = "#1B2A8A";
const teal = "#00B4AA";
const red = "#E8344E";
const yellow = "#F5C400";

export default function Home() {
  const [seats, setSeats] = useState<{ remaining: number; total: number } | null>(null);
  const [feedback, setFeedback] = useState({ name: "", email: "", rating: "", interest: "", comments: "", notify: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/rsvp").then(r => r.json()).then(d => setSeats(d));
  }, []);

  const isFull = seats !== null && seats.remaining <= 0;

  async function submitFeedback() {
    setError("");
    if (!feedback.name || !feedback.email || !feedback.rating) {
      setError("Please fill in your name, email and rating.");
      return;
    }
    setSubmitting(true);
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    });
    if (res.ok) setSubmitted(true);
    else setError("Something went wrong. Please try again.");
    setSubmitting(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: navy, fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", color: "#fff" }}>

      {/* NAV */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(27,42,138,0.9)", backdropFilter: "blur(12px)" }}>
        <div style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" }}>Founders Table Namibia</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Edition 1 · 20 August 2026</div>
      </div>

      {/* HERO — full screen */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden", padding: "100px 32px 60px" }}>
        {/* Top circles */}
        <div style={{ position: "absolute", top: -80, left: -80, width: 240, height: 240, borderRadius: "50%", background: red, opacity: 0.85 }} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: teal, opacity: 0.85 }} />
        <div style={{ position: "absolute", top: -80, left: 80, width: 240, height: 240, borderRadius: "50%", background: "#0a0a14" }} />
        <div style={{ position: "absolute", top: -80, right: 80, width: 240, height: 240, borderRadius: "50%", background: "#0a0a14" }} />
        {/* Bottom circles */}
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 240, height: 240, borderRadius: "50%", background: yellow, opacity: 0.85 }} />
        <div style={{ position: "absolute", bottom: -80, left: 80, width: 240, height: 240, borderRadius: "50%", background: "#0a0a14" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: teal, opacity: 0.85 }} />
        <div style={{ position: "absolute", bottom: -80, right: 80, width: 240, height: 240, borderRadius: "50%", background: "#0a0a14" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: yellow, color: navy, fontWeight: "800", fontSize: "13px", padding: "4px 14px", borderRadius: "4px", marginBottom: "20px", letterSpacing: "0.08em" }}>THE</div>
          <h1 style={{ fontSize: "clamp(72px, 18vw, 140px)", fontWeight: "900", lineHeight: 0.88, margin: "0 0 -8px", letterSpacing: "-4px", textTransform: "uppercase" }}>FOUNDERS</h1>
          <h1 style={{ fontSize: "clamp(72px, 18vw, 140px)", fontWeight: "900", lineHeight: 0.88, margin: "0 0 40px", letterSpacing: "-4px", textTransform: "uppercase", color: teal }}>TABLE</h1>
          <div style={{ fontSize: "clamp(14px, 2.5vw, 20px)", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.02em" }}>Edition 1: THE GRAVEYARD OF GOOD IDEAS</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "40px" }}>Presented by Unqo Digital and Moodbod</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {[
              { label: "Thursday, 20 August 2026" },
              { label: "Vinyls Music Cafe, Windhoek" },
              { label: "18:00 to 21:30 · Free Entry" },
            ].map(({ label }) => (
              <div key={label} style={{ padding: "8px 18px", background: "rgba(255,255,255,0.1)", borderRadius: "100px", fontSize: "13px", border: "1px solid rgba(255,255,255,0.15)" }}>
                {label}
              </div>
            ))}
          </div>
          {isFull && (
            <div style={{ display: "inline-block", background: red, color: "#fff", fontWeight: "700", fontSize: "13px", padding: "10px 24px", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              The Table is Full
            </div>
          )}
        </div>
      </div>

      {/* ABOUT */}
      <div style={{ background: "#f0f0f5", color: navy, padding: "80px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: teal, marginBottom: "16px" }}>The Evening</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: "800", marginBottom: "24px", lineHeight: 1.15 }}>Not a pitch night. Not a networking event dressed up as a panel.</h2>
          <p style={{ fontSize: "17px", lineHeight: 1.85, color: "#444", marginBottom: "16px" }}>
            The Founders Table is a structured, honest conversation about why good ideas die in Namibia and what the root causes of that failure actually are. The goal is simple: leave every person in that room with a clearer picture of why things are the way they are and what it would actually take to change them.
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.85, color: "#444" }}>
            The tone is curiosity, not judgment. We are not here to expose anyone. We are here to understand, because you cannot fix what you have not honestly looked at.
          </p>
        </div>
      </div>

      {/* CO-CREATORS */}
      <div style={{ background: navy, padding: "80px 32px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: teal, marginBottom: "12px" }}>Behind the Table</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "800" }}>The Co-Creators</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            {[
              {
                name: "Denzel Karupa",
                title: "Founder and CEO",
                company: "Unqo Digital Solutions",
                photo: "/denzel.jpg",
                position: "center 20%",
                bio: "Denzel is a self-taught developer and founder based in Windhoek who builds things he wishes already existed. Unqo Properties, connecting Namibians with verified agents and a home to call their own. Imali, a budgeting app that removes the friction between you and your money. And Ondjila AI, teaching the world's next workforce AI skills built with African context. He co-created the Founders Table to bring founders together around the topics people are usually afraid to say out loud. He builds first and figures out the rest on the way there.",
                links: [
                  { label: "Unqo Digital", url: "https://unqodigital.com" },
                  { label: "Unqo Properties", url: "https://unqoproperties.com" },
                ],
                color: teal,
                reverse: false,
              },
              {
                name: "Simeon Tuyoleni",
                title: "Founder",
                company: "Asmbly and Moodbod",
                photo: "/simeon.jpg",
                position: "center 15%",
                bio: "Simeon is the founder of Asmbly, an education technology startup bringing teachers, learners and the education system together to improve the quality of education in Namibia and beyond, and Moodbod, a technology company that turns ideas into digital products. His work is centred around building practical solutions to problems and bringing people together around what can be built when ideas, technology and community meet. Through Founders Table Namibia, he wants to bring founders into one conversation where they can learn from each other and progressively build a more sustainable future together.",
                links: [
                  { label: "Asmbly", url: "https://asmbly.space" },
                  { label: "Moodbod", url: "https://www.moodbod.agency" },
                ],
                color: yellow,
                reverse: true,
              },
            ].map((person) => (
              <div key={person.name} style={{ display: "flex", flexDirection: person.reverse ? "row-reverse" : "row", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
                {/* Floating glass image frame */}
                <div style={{ flexShrink: 0, width: 280, height: 360, position: "relative" }}>
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "24px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: `0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.05)`,
                    overflow: "hidden",
                    padding: "10px",
                  }}>
                    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden" }}>
                      <Image src={person.photo} alt={person.name} fill style={{ objectFit: "cover", objectPosition: person.position }} />
                    </div>
                    {/* Glass edge highlight */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", borderRadius: "24px 24px 0 0", background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)", pointerEvents: "none" }} />
                  </div>
                  {/* Floating glow */}
                  <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", width: 200, height: 40, background: person.color, filter: "blur(30px)", opacity: 0.3, borderRadius: "50%" }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.18em", textTransform: "uppercase", color: person.color, marginBottom: "10px" }}>{person.title} · {person.company}</div>
                  <h3 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: "900", marginBottom: "20px", lineHeight: 1.05, letterSpacing: "-0.5px" }}>{person.name}</h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(255,255,255,0.6)", marginBottom: "28px" }}>{person.bio}</p>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {person.links.map(link => (
                      <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "12px", fontWeight: "700", padding: "8px 18px", borderRadius: "100px", border: `1.5px solid ${person.color}`, color: person.color, textDecoration: "none", letterSpacing: "0.06em", background: "rgba(255,255,255,0.04)" }}>
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEEDBACK */}
      <div style={{ background: "#f0f0f5", color: navy, padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: teal, marginBottom: "12px" }}>Your Voice Matters</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: "800", marginBottom: "16px" }}>Leave Your Mark</h2>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.7 }}>Honest feedback, ideas for collaboration, sponsorship interest, or just want to be part of what comes next. This is the space.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "60px 40px", background: "#fff", borderRadius: "16px", border: `2px solid ${teal}` }}>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: navy, marginBottom: "12px" }}>Thank you.</h3>
              <p style={{ color: "#555" }}>We have received your feedback and will be in touch.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px" }}>Full Name *</label>
                  <input value={feedback.name} onChange={e => setFeedback(f => ({ ...f, name: e.target.value }))} placeholder="Your name"
                    style={{ width: "100%", padding: "12px 16px", fontSize: "15px", border: "1.5px solid #e0e0e0", borderRadius: "8px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: navy }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px" }}>Email Address *</label>
                  <input type="email" value={feedback.email} onChange={e => setFeedback(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com"
                    style={{ width: "100%", padding: "12px 16px", fontSize: "15px", border: "1.5px solid #e0e0e0", borderRadius: "8px", outline: "none", fontFamily: "inherit", boxSizing: "border-box", color: navy }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px" }}>How was the evening? *</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["Excellent", "Great", "Good", "Could be better"].map(r => (
                      <button key={r} onClick={() => setFeedback(f => ({ ...f, rating: r }))}
                        style={{ padding: "8px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", border: `2px solid ${feedback.rating === r ? teal : "#e0e0e0"}`, background: feedback.rating === r ? teal : "#fff", color: feedback.rating === r ? "#fff" : "#555" }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px" }}>I am interested in</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["Collaborating", "Sponsoring", "Joining the team", "Just staying in touch"].map(r => (
                      <button key={r} onClick={() => setFeedback(f => ({ ...f, interest: f.interest === r ? "" : r }))}
                        style={{ padding: "8px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", border: `2px solid ${feedback.interest === r ? navy : "#e0e0e0"}`, background: feedback.interest === r ? navy : "#fff", color: feedback.interest === r ? "#fff" : "#555" }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "8px" }}>Anything else you want to say</label>
                  <textarea value={feedback.comments} onChange={e => setFeedback(f => ({ ...f, comments: e.target.value }))} rows={4} placeholder="Feedback, ideas, questions, anything."
                    style={{ width: "100%", padding: "12px 16px", fontSize: "15px", border: "1.5px solid #e0e0e0", borderRadius: "8px", outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", color: navy }} />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <input type="checkbox" checked={feedback.notify} onChange={e => setFeedback(f => ({ ...f, notify: e.target.checked }))} style={{ accentColor: teal, width: 18, height: 18 }} />
                  <span style={{ fontSize: "14px", color: "#555" }}>Notify me about Edition 2</span>
                </label>
                {error && <div style={{ fontSize: "13px", color: red, padding: "12px 16px", background: "rgba(232,52,78,0.06)", borderRadius: "8px", border: `1px solid ${red}` }}>{error}</div>}
                <button onClick={submitFeedback} disabled={submitting}
                  style={{ width: "100%", padding: "16px", fontSize: "14px", fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", background: navy, color: "#fff", border: "none", borderRadius: "8px", cursor: submitting ? "not-allowed" : "pointer" }}>
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#0a0e1f", padding: "60px 32px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "16px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Founders Table Namibia</div>
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Presented by Unqo Digital and Moodbod</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "40px", marginBottom: "48px" }}>
            {[
              {
                name: "Denzel Karupa",
                role: "Founder, Unqo Digital",
                email: "info@unqodigital.com",
                phone: "+264 81 281 3427",
                color: "#00B4AA",
              },
              {
                name: "Simeon Tuyoleni",
                role: "Founder, Moodbod",
                email: "simeon@moodbod.agency",
                phone: "",
                color: "#F5C400",
              },
            ].map(person => (
              <div key={person.name} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "24px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: person.color, marginBottom: "6px" }}>{person.role}</div>
                <div style={{ fontSize: "17px", fontWeight: "800", marginBottom: "16px" }}>{person.name}</div>
                <a href={`mailto:${person.email}`} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "8px" }}>{person.email}</a>
                {person.phone && <a href={`tel:${person.phone.replace(/\s/g, "")}`} style={{ display: "block", fontSize: "13px", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{person.phone}</a>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: "12px", color: "rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}>
            Founders Table Namibia · Edition 1 · 20 August 2026 · Windhoek, Namibia
          </div>
        </div>
      </div>
    </div>
  );
}
