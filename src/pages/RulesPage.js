import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { GAMES } from "../data/games";

export default function RulesPage() {
  const { rules } = useStore();
  const [activeGame, setActiveGame] = useState("general");

  const tabs = [
    { id: "general", label: "General Rules", icon: "📜" },
    ...GAMES.map((g) => ({ id: g.id, label: g.name, icon: g.icon, color: g.color })),
  ];

  const activeRules = rules[activeGame] || [];

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p className="section-subtitle">Know The Rules</p>
        <h2 className="section-title">Tournament Rules</h2>

        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          {/* Sidebar */}
          <div style={{ minWidth: 200, flex: "0 0 200px" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveGame(tab.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "12px 16px", marginBottom: 8,
                  background: activeGame === tab.id ? "var(--bg-glass)" : "transparent",
                  border: `1px solid ${activeGame === tab.id ? (tab.color || "var(--accent-1)") : "var(--border-color)"}`,
                  borderRadius: 6, cursor: "pointer",
                  color: activeGame === tab.id ? (tab.color || "var(--accent-1)") : "var(--text-secondary)",
                  fontFamily: "var(--font-display)", fontSize: "0.72rem",
                  letterSpacing: "0.05em", textAlign: "left",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { if (activeGame !== tab.id) e.currentTarget.style.borderColor = "var(--accent-1)40"; }}
                onMouseLeave={(e) => { if (activeGame !== tab.id) e.currentTarget.style.borderColor = "var(--border-color)"; }}
              >
                <span style={{ fontSize: "1.1rem" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Rules content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="card">
              <h3 style={{
                fontFamily: "var(--font-display)", marginBottom: 24,
                color: tabs.find((t) => t.id === activeGame)?.color || "var(--accent-1)",
              }}>
                {tabs.find((t) => t.id === activeGame)?.icon}{" "}
                {tabs.find((t) => t.id === activeGame)?.label}
              </h3>
              {activeRules.length > 0 ? (
                <ol style={{ listStyle: "none", padding: 0 }}>
                  {activeRules.map((rule, i) => (
                    <li key={i} style={{
                      display: "flex", gap: 16, alignItems: "flex-start",
                      padding: "14px 0",
                      borderBottom: i < activeRules.length - 1 ? "1px solid var(--border-color)" : "none",
                    }}>
                      <span style={{
                        background: "var(--bg-glass)", border: "1px solid var(--border-color)",
                        borderRadius: 4, width: 28, height: 28,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: "0.7rem",
                        color: "var(--accent-1)", flexShrink: 0, fontWeight: 700,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                        {rule}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  Rules for this game will be published soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
