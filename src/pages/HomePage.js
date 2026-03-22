import React from "react";
import Hero from "../components/Hero";
import GameCard from "../components/GameCard";
import { GAMES } from "../data/games";
import { useStore } from "../context/StoreContext";

export default function HomePage({ setPage, setSelectedGame }) {
  const { sponsors, events } = useStore();

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setPage("register");
  };

  const upcomingEvents = events
    .filter((e) => e.type === "match" || e.type === "finals" || e.type === "deadline")
    .slice(0, 4);

  return (
    <div>
      <Hero setPage={setPage} />

      {/* Games Section */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <p className="section-subtitle">Choose Your Arena</p>
          <h2 className="section-title">Tournament Games</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {GAMES.map((game) => (
              <GameCard key={game.id} game={game} onClick={() => handleGameClick(game)} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn btn-outline" onClick={() => setPage("games")}>
              View All Game Details →
            </button>
          </div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="section">
        <div className="container">
          <p className="section-subtitle">Important Dates</p>
          <h2 className="section-title">Event Schedule</h2>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            {upcomingEvents.map((event, i) => (
              <div key={event.id} style={{
                display: "flex", gap: 24, marginBottom: 24,
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: "50%",
                    background: event.type === "finals" ? "var(--accent-2)" : "var(--accent-1)",
                    boxShadow: `0 0 12px ${event.type === "finals" ? "var(--accent-2)" : "var(--accent-1)"}`,
                    flexShrink: 0, marginTop: 4,
                  }} />
                  {i < upcomingEvents.length - 1 && (
                    <div style={{ width: 1, flex: 1, background: "var(--border-color)", margin: "8px 0" }} />
                  )}
                </div>
                <div className="card" style={{ flex: 1, padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>
                        {event.title}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{event.description}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--accent-1)", fontFamily: "var(--font-display)" }}>{event.date}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{event.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button className="btn btn-outline" onClick={() => setPage("schedule")}>
              Full Schedule →
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <p className="section-subtitle">Powered By</p>
          <h2 className="section-title">Our Sponsors</h2>
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: 24,
          }}>
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.id}
                href={sponsor.website}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border-color)",
                  borderRadius: 8, padding: "20px 32px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                  transition: "all 0.2s", cursor: "pointer",
                  textDecoration: "none",
                  minWidth: 140,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <span style={{ fontSize: "2.5rem" }}>{sponsor.logo}</span>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: "0.85rem", color: "var(--text-primary)",
                }}>{sponsor.name}</div>
                <span className={`badge badge-${sponsor.tier}`}>{sponsor.tier}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "100px 24px",
        background: "var(--gradient-hero)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, var(--bg-glass) 0%, transparent 70%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 900, marginBottom: 16,
          }}>
            Ready to <span style={{
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Dominate?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 36, fontSize: "0.95rem" }}>
            Slots are limited. Register your team before it's too late.
          </p>
          <button className="btn btn-primary" onClick={() => setPage("register")} style={{ fontSize: "0.9rem", padding: "16px 48px" }}>
            ⚔️ Register Your Team
          </button>
        </div>
      </section>
    </div>
  );
}
