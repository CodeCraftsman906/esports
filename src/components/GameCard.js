import React, { useState } from "react";

export default function GameCard({ game, onClick }) {
  const [hovered, setHovered] = useState(false);

  const feeDisplay = () => {
    if (game.feeType === "flexible") return `₹${game.fee.solo} / ₹${game.fee.duo}`;
    return `₹${game.fee}`;
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${game.glowColor.replace("66", "10")}` : "var(--bg-card)",
        border: `1px solid ${hovered ? game.color + "80" : "var(--border-color)"}`,
        borderRadius: 8,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 12px 40px ${game.glowColor}, var(--card-shadow)` : "var(--card-shadow)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow corner */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 80, height: 80,
        background: `radial-gradient(circle at top right, ${game.glowColor}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Icon */}
      <div style={{
        fontSize: "3rem", marginBottom: 16, lineHeight: 1,
        filter: hovered ? `drop-shadow(0 0 12px ${game.color})` : "none",
        transition: "filter 0.3s",
      }}>
        {game.icon}
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1rem",
        fontWeight: 700, letterSpacing: "0.05em",
        color: hovered ? game.color : "var(--text-primary)",
        marginBottom: 6, transition: "color 0.3s",
      }}>
        {game.name}
      </h3>

      <div style={{
        fontSize: "0.7rem", color: "var(--text-secondary)",
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: 16,
      }}>
        {game.genre} • {game.platform}
      </div>

      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
        {game.description}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        <span style={{
          background: `${game.color}20`, border: `1px solid ${game.color}40`,
          color: game.color, padding: "3px 10px", borderRadius: 2,
          fontSize: "0.65rem", letterSpacing: "0.15em",
          fontFamily: "var(--font-display)", fontWeight: 700,
        }}>
          {game.mode}
        </span>
        {game.maxPlayers > 1 && (
          <span style={{
            background: "var(--bg-glass)", border: "1px solid var(--border-color)",
            color: "var(--text-secondary)", padding: "3px 10px", borderRadius: 2,
            fontSize: "0.65rem", letterSpacing: "0.1em",
          }}>
            {game.maxPlayers} MAX
          </span>
        )}
      </div>

      {/* Fee */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: "1px solid var(--border-color)", paddingTop: 16,
      }}>
        <div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", letterSpacing: "0.15em", marginBottom: 2 }}>
            ENTRY FEE
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "1.1rem", color: game.color,
          }}>
            {feeDisplay()}
          </div>
        </div>
        <div style={{
          background: `${game.color}20`, border: `1px solid ${game.color}40`,
          borderRadius: 4, padding: "8px 16px",
          fontFamily: "var(--font-display)", fontSize: "0.7rem",
          color: game.color, letterSpacing: "0.1em",
          transition: "background 0.2s",
        }}>
          REGISTER →
        </div>
      </div>
    </div>
  );
}
