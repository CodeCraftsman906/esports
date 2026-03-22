import React from "react";
import { useStore } from "../context/StoreContext";
import { GAMES } from "../data/games";

export default function SchedulePage() {
  const { events } = useStore();
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const typeColors = {
    registration: "#00ffff",
    deadline: "#ff4400",
    announcement: "#ffcc00",
    match: "#00ff41",
    finals: "#ff00ff",
  };

  const typeIcons = {
    registration: "📝",
    deadline: "⏰",
    announcement: "📢",
    match: "⚔️",
    finals: "🏆",
  };

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p className="section-subtitle">Tournament Calendar</p>
        <h2 className="section-title">Full Schedule</h2>

        {/* Game quick-ref */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "center", marginBottom: 60,
        }}>
          {GAMES.map((g) => (
            <div key={g.id} style={{
              background: "var(--bg-card)", border: `1px solid ${g.color}40`,
              borderRadius: 6, padding: "8px 16px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span>{g.icon}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", color: g.color }}>{g.name}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {sorted.map((event, i) => (
            <div key={event.id} style={{ display: "flex", gap: 24, marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: `${typeColors[event.type]}20`,
                  border: `2px solid ${typeColors[event.type]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem",
                  boxShadow: `0 0 16px ${typeColors[event.type]}40`,
                }}>
                  {typeIcons[event.type]}
                </div>
                {i < sorted.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: "var(--border-color)", margin: "8px 0" }} />
                )}
              </div>
              <div className="card" style={{
                flex: 1, padding: "20px 24px", marginBottom: 0,
                borderColor: `${typeColors[event.type]}30`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: "0.65rem",
                      letterSpacing: "0.15em", color: typeColors[event.type],
                      textTransform: "uppercase", display: "block", marginBottom: 4,
                    }}>
                      {event.type}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", marginBottom: 8 }}>
                      {event.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {event.description}
                    </p>
                  </div>
                  <div style={{
                    background: "var(--bg-glass)", border: "1px solid var(--border-color)",
                    borderRadius: 6, padding: "12px 20px", textAlign: "center",
                    flexShrink: 0, alignSelf: "flex-start",
                  }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: "var(--accent-1)" }}>
                      {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)", marginTop: 2 }}>{event.time}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
