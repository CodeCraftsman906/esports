import React from "react";

export default function Footer({ setPage }) {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-color)",
      padding: "60px 24px 32px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: "1.5rem" }}>⚔️</span>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)", fontWeight: 900,
                  fontSize: "1rem",
                  background: "var(--gradient-accent)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>NEXABATTLE</div>
              </div>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              The premier esports tournament platform. Compete. Conquer. Champion.
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--text-secondary)", marginBottom: 16 }}>
              NAVIGATION
            </h4>
            {[
              { id: "home", label: "Home" },
              { id: "games", label: "Games" },
              { id: "schedule", label: "Schedule" },
              { id: "rules", label: "Rules" },
              { id: "faq", label: "FAQ" },
            ].map((link) => (
              <div key={link.id} style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setPage(link.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "var(--text-secondary)", fontSize: "0.85rem",
                    fontFamily: "var(--font-body)", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.target.style.color = "var(--accent-1)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
                >
                  {link.label}
                </button>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--text-secondary)", marginBottom: 16 }}>
              CONTACT
            </h4>
            {[
              { icon: "📧", text: "nexabattle@gmail.com" },
              { icon: "📱", text: "+91 98765 43210" },
              { icon: "💬", text: "Discord: NexaBattle" },
            ].map((c) => (
              <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span>{c.icon}</span>
                <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{c.text}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--text-secondary)", marginBottom: 16 }}>
              ADMIN
            </h4>
            <button
              onClick={() => setPage("admin")}
              className="btn btn-outline btn-sm"
            >
              🔐 Admin Panel
            </button>
            <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 12, lineHeight: 1.6 }}>
              For organizers and tournament staff only.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid var(--border-color)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
        }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            © 2025 NexaBattle Esports Tournament. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {["🔒 SSL Secured", "🇮🇳 Made in India"].map((tag) => (
              <span key={tag} style={{
                fontSize: "0.65rem", color: "var(--text-secondary)",
                background: "var(--bg-glass)", border: "1px solid var(--border-color)",
                borderRadius: 4, padding: "4px 10px",
                fontFamily: "var(--font-display)", letterSpacing: "0.05em",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
