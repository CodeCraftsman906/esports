import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function FAQPage() {
  const { faqs } = useStore();
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(faqs.map((f) => f.category))];
  const filtered = filter === "all" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p className="section-subtitle">Got Questions?</p>
        <h2 className="section-title">FAQ</h2>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="btn btn-sm"
              style={{
                background: filter === cat ? "var(--btn-primary)" : "transparent",
                color: filter === cat ? "var(--btn-primary-text)" : "var(--text-secondary)",
                border: `1px solid ${filter === cat ? "transparent" : "var(--border-color)"}`,
                textTransform: "capitalize",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {filtered.map((faq) => (
            <div
              key={faq.id}
              style={{
                marginBottom: 12,
                background: "var(--bg-card)",
                border: `1px solid ${open === faq.id ? "var(--accent-1)" : "var(--border-color)"}`,
                borderRadius: 8,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  width: "100%", padding: "20px 24px",
                  background: "transparent", border: "none", cursor: "pointer",
                  color: open === faq.id ? "var(--accent-1)" : "var(--text-primary)",
                  fontFamily: "var(--font-body)", fontSize: "0.92rem",
                  textAlign: "left", gap: 16,
                  transition: "color 0.2s",
                }}
              >
                <span>{faq.question}</span>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "1rem",
                  transition: "transform 0.3s",
                  transform: open === faq.id ? "rotate(45deg)" : "none",
                  color: "var(--accent-1)", flexShrink: 0,
                }}>+</span>
              </button>
              {open === faq.id && (
                <div style={{
                  padding: "0 24px 20px",
                  fontSize: "0.85rem", color: "var(--text-secondary)",
                  lineHeight: 1.8, borderTop: "1px solid var(--border-color)",
                  paddingTop: 16,
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
