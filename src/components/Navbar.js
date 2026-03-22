import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ currentPage, setPage }) {
  const { theme, themeId, setThemeId, themes } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "games", label: "Games" },
    { id: "schedule", label: "Schedule" },
    { id: "rules", label: "Rules" },
    { id: "faq", label: "FAQ" },
    { id: "register", label: "Register", highlight: true },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid var(--border-color)` : "none",
      transition: "all 0.3s ease",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <span style={{ fontSize: "1.8rem" }}>⚔️</span>
          <div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "1.1rem", letterSpacing: "0.15em",
              background: "var(--gradient-accent)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>NEXABATTLE</div>
            <div style={{ fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--text-secondary)", marginTop: -2 }}>
              ESPORTS TOURNAMENT
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              style={{
                background: link.highlight
                  ? "var(--btn-primary)"
                  : currentPage === link.id ? "var(--bg-glass)" : "transparent",
                border: link.highlight ? "none" : `1px solid ${currentPage === link.id ? "var(--accent-1)" : "transparent"}`,
                borderRadius: 4,
                color: link.highlight ? "var(--btn-primary-text)" : currentPage === link.id ? "var(--accent-1)" : "var(--text-secondary)",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                padding: link.highlight ? "8px 16px" : "8px 12px",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!link.highlight && currentPage !== link.id) {
                  e.target.style.color = "var(--accent-1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!link.highlight && currentPage !== link.id) {
                  e.target.style.color = "var(--text-secondary)";
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Theme Switcher */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setThemeOpen(!themeOpen)}
            style={{
              background: "var(--bg-glass)",
              border: "1px solid var(--border-color)",
              borderRadius: 4, cursor: "pointer",
              color: "var(--text-primary)",
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              padding: "8px 12px",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span>{theme.icon}</span>
            <span style={{ display: window.innerWidth < 768 ? "none" : "block" }}>{theme.name}</span>
            <span style={{ opacity: 0.5 }}>▾</span>
          </button>
          {themeOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: 8, overflow: "hidden",
              minWidth: 180, zIndex: 100,
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            }}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setThemeId(t.id); setThemeOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    width: "100%", padding: "12px 16px",
                    background: themeId === t.id ? "var(--bg-glass)" : "transparent",
                    border: "none", borderBottom: "1px solid var(--border-color)",
                    color: themeId === t.id ? "var(--accent-1)" : "var(--text-secondary)",
                    cursor: "pointer",
                    fontFamily: "var(--font-display)", fontSize: "0.72rem",
                    letterSpacing: "0.05em", textAlign: "left",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-glass)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = themeId === t.id ? "var(--bg-glass)" : "transparent"}
                >
                  <span style={{ fontSize: "1.2rem" }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: "0.65rem", opacity: 0.6 }}>{t.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
