import React, { useEffect, useRef } from "react";

export default function Hero({ setPage }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent-1").trim() || "#00ffff";
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(animate);
    };
    animate();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: "var(--gradient-hero)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: `linear-gradient(var(--accent-1) 1px, transparent 1px), linear-gradient(90deg, var(--accent-1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div style={{
        position: "relative", zIndex: 2, textAlign: "center",
        padding: "0 24px", maxWidth: 900,
      }}>
        <div style={{
          display: "inline-block",
          background: "var(--bg-glass)", backdropFilter: "blur(10px)",
          border: "1px solid var(--border-color)", borderRadius: 4,
          padding: "6px 20px", marginBottom: 32,
          fontFamily: "var(--font-display)", fontSize: "0.7rem",
          letterSpacing: "0.3em", color: "var(--accent-1)",
          textTransform: "uppercase",
          animation: "pulse-glow 2s ease-in-out infinite",
        }}>
          ⚡ Registration Open — Secure Your Spot
        </div>

        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 900,
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          lineHeight: 1.05, letterSpacing: "0.02em",
          marginBottom: 8,
        }}>
          <span style={{
            background: "var(--gradient-accent)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            NEXA
          </span>
          <span style={{ color: "var(--text-primary)" }}>BATTLE</span>
        </h1>

        <h2 style={{
          fontFamily: "var(--font-display)", fontWeight: 400,
          fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
          color: "var(--text-secondary)",
          letterSpacing: "0.3em", marginBottom: 12,
          textTransform: "uppercase",
        }}>
          Esports Tournament 2025
        </h2>

        <div style={{
          width: 120, height: 2, margin: "0 auto 32px",
          background: "var(--gradient-accent)",
        }} />

        <p style={{
          fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
          color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto 48px",
          lineHeight: 1.8,
        }}>
          8 Games. Hundreds of warriors. One ultimate champion.
          Register your squad and prove your dominance.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => setPage("register")} style={{ fontSize: "0.85rem", padding: "14px 36px" }}>
            ⚔️ Register Now
          </button>
          <button className="btn btn-outline" onClick={() => setPage("games")} style={{ fontSize: "0.85rem", padding: "14px 36px" }}>
            🎮 View Games
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24, marginTop: 80, maxWidth: 700, marginLeft: "auto", marginRight: "auto",
        }}>
          {[
            { label: "Games", value: "8" },
            { label: "Total Slots", value: "100+" },
            { label: "Prize Pool", value: "₹50K+" },
            { label: "Days", value: "6" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 900,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: "var(--accent-1)",
                textShadow: "var(--accent-glow)",
              }}>{stat.value}</div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--text-secondary)", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: "linear-gradient(transparent, var(--bg-primary))",
      }} />
    </section>
  );
}
