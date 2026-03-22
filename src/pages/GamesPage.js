import React, { useState } from "react";
import GameCard from "../components/GameCard";
import { GAMES } from "../data/games";

export default function GamesPage({ setPage, setSelectedGame }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All Games" },
    { id: "Mobile", label: "Mobile" },
    { id: "PC", label: "PC" },
    { id: "SQUAD", label: "Squad" },
    { id: "SOLO", label: "Solo" },
  ];

  const filtered = GAMES.filter((g) => {
    if (filter === "all") return true;
    if (filter === "Mobile") return g.platform.includes("Mobile");
    if (filter === "PC") return g.platform.includes("PC");
    if (filter === "SQUAD") return g.mode.includes("SQUAD");
    if (filter === "SOLO") return g.mode.includes("SOLO");
    return true;
  });

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p className="section-subtitle">Choose Your Battlefield</p>
        <h2 className="section-title">All Tournament Games</h2>

        {/* Filters */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="btn"
              style={{
                background: filter === f.id ? "var(--btn-primary)" : "transparent",
                color: filter === f.id ? "var(--btn-primary-text)" : "var(--text-secondary)",
                border: `1px solid ${filter === f.id ? "transparent" : "var(--border-color)"}`,
                padding: "8px 20px", fontSize: "0.7rem",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 28,
        }}>
          {filtered.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => { setSelectedGame(game); setPage("register"); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
