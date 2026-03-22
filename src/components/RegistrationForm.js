import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

const FORM_CONFIGS = {
  bgmi: {
    fields: [
      { name: "teamName", label: "Team Name", type: "text", required: true, placeholder: "Enter team name" },
      { name: "captainName", label: "Captain Name", type: "text", required: true },
      { name: "captainPhone", label: "Captain Phone", type: "tel", required: true },
      { name: "captainEmail", label: "Captain Email", type: "email", required: true },
      { name: "captainUID", label: "BGMI UID (Captain)", type: "text", required: true, placeholder: "In-game UID" },
      { name: "player2", label: "Player 2 Name", type: "text", required: true },
      { name: "player2UID", label: "Player 2 UID", type: "text", required: true },
      { name: "player3", label: "Player 3 Name", type: "text", required: true },
      { name: "player3UID", label: "Player 3 UID", type: "text", required: true },
      { name: "player4", label: "Player 4 Name", type: "text", required: false, placeholder: "Optional" },
      { name: "player4UID", label: "Player 4 UID", type: "text", required: false, placeholder: "Optional" },
      { name: "player5", label: "Player 5 Name", type: "text", required: false, placeholder: "Optional" },
      { name: "player5UID", label: "Player 5 UID", type: "text", required: false, placeholder: "Optional" },
    ],
    fee: 350,
  },
  ff: {
    fields: [
      { name: "teamName", label: "Team Name", type: "text", required: true },
      { name: "captainName", label: "Captain Name", type: "text", required: true },
      { name: "captainPhone", label: "Captain Phone", type: "tel", required: true },
      { name: "captainEmail", label: "Captain Email", type: "email", required: true },
      { name: "captainUID", label: "Free Fire UID (Captain)", type: "text", required: true },
      { name: "player2", label: "Player 2 Name", type: "text", required: true },
      { name: "player2UID", label: "Player 2 FF UID", type: "text", required: true },
      { name: "player3", label: "Player 3 Name", type: "text", required: true },
      { name: "player3UID", label: "Player 3 FF UID", type: "text", required: true },
      { name: "player4", label: "Player 4 Name", type: "text", required: false },
      { name: "player4UID", label: "Player 4 FF UID", type: "text", required: false },
      { name: "player5", label: "Player 5 Name", type: "text", required: false },
      { name: "player5UID", label: "Player 5 FF UID", type: "text", required: false },
    ],
    fee: 250,
  },
  "clash-royale": {
    fields: [
      { name: "participantName", label: "Your Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "playerTag", label: "Clash Royale Player Tag", type: "text", required: true, placeholder: "#XXXXXXXX" },
      {
        name: "mode", label: "Participation Mode", type: "select", required: true,
        options: ["Solo (₹80)", "Duo (₹150)"],
      },
      { name: "duoPartnerName", label: "Duo Partner Name (if Duo)", type: "text", required: false },
      { name: "duoPartnerTag", label: "Duo Partner Player Tag (if Duo)", type: "text", required: false, placeholder: "#XXXXXXXX" },
    ],
    fee: "80 / 150",
    dynamicFee: (data) => data.mode && data.mode.includes("Duo") ? 150 : 80,
  },
  codm: {
    fields: [
      { name: "teamName", label: "Team Name", type: "text", required: true },
      { name: "captainName", label: "Captain Name", type: "text", required: true },
      { name: "captainPhone", label: "Captain Phone", type: "tel", required: true },
      { name: "captainEmail", label: "Captain Email", type: "email", required: true },
      { name: "captainCODID", label: "COD Mobile ID (Captain)", type: "text", required: true, placeholder: "Player ID#Tag" },
      { name: "player2", label: "Player 2 Name", type: "text", required: true },
      { name: "player2CODID", label: "Player 2 COD ID", type: "text", required: true },
      { name: "player3", label: "Player 3 Name", type: "text", required: true },
      { name: "player3CODID", label: "Player 3 COD ID", type: "text", required: true },
      { name: "player4", label: "Player 4 Name", type: "text", required: false },
      { name: "player4CODID", label: "Player 4 COD ID", type: "text", required: false },
      { name: "player5", label: "Player 5 Name", type: "text", required: false },
      { name: "player5CODID", label: "Player 5 COD ID", type: "text", required: false },
    ],
    fee: 350,
  },
  cs2: {
    fields: [
      {
        name: "mode", label: "Participation Mode", type: "select", required: true,
        options: ["Solo (₹450)", "Squad (₹450)"],
      },
      { name: "teamName", label: "Team / Player Name", type: "text", required: true },
      { name: "captainName", label: "Captain / Player Full Name", type: "text", required: true },
      { name: "captainPhone", label: "Phone Number", type: "tel", required: true },
      { name: "captainEmail", label: "Email", type: "email", required: true },
      { name: "steamID", label: "Steam ID / URL", type: "text", required: true, placeholder: "https://steamcommunity.com/id/..." },
      { name: "player2", label: "Player 2 Name", type: "text", required: false },
      { name: "player2Steam", label: "Player 2 Steam ID", type: "text", required: false },
      { name: "player3", label: "Player 3 Name", type: "text", required: false },
      { name: "player3Steam", label: "Player 3 Steam ID", type: "text", required: false },
      { name: "player4", label: "Player 4 Name", type: "text", required: false },
      { name: "player4Steam", label: "Player 4 Steam ID", type: "text", required: false },
      { name: "player5", label: "Player 5 Name", type: "text", required: false },
      { name: "player5Steam", label: "Player 5 Steam ID", type: "text", required: false },
      { name: "player6", label: "Player 6 Name", type: "text", required: false },
      { name: "player6Steam", label: "Player 6 Steam ID", type: "text", required: false },
    ],
    fee: 450,
  },
  "fall-guys": {
    fields: [
      { name: "playerName", label: "Player Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "epicID", label: "Epic Games Username", type: "text", required: true },
      { name: "platform", label: "Platform", type: "select", required: true, options: ["PC", "PlayStation", "Xbox", "Nintendo Switch"] },
    ],
    fee: 80,
  },
  "smash-karts": {
    fields: [
      { name: "playerName", label: "Player Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "inGameName", label: "In-Game Username", type: "text", required: true },
      { name: "device", label: "Device / Browser", type: "select", required: true, options: ["Chrome / PC", "Chrome / Mobile", "Firefox / PC", "Other"] },
    ],
    fee: 80,
  },
  "pokemon-unite": {
    fields: [
      { name: "teamName", label: "Team Name", type: "text", required: true },
      { name: "captainName", label: "Captain Name", type: "text", required: true },
      { name: "captainPhone", label: "Captain Phone", type: "tel", required: true },
      { name: "captainEmail", label: "Captain Email", type: "email", required: true },
      { name: "captainTrainerName", label: "Trainer Name (Captain)", type: "text", required: true, placeholder: "In-game trainer name" },
      { name: "platform", label: "Platform", type: "select", required: true, options: ["Mobile", "Nintendo Switch"] },
      { name: "player2", label: "Player 2 Trainer Name", type: "text", required: true },
      { name: "player3", label: "Player 3 Trainer Name", type: "text", required: true },
      { name: "player4", label: "Player 4 Trainer Name", type: "text", required: true },
      { name: "player5", label: "Player 5 Trainer Name", type: "text", required: true },
      { name: "player6", label: "Player 6 Trainer Name (Substitute)", type: "text", required: false },
    ],
    fee: 350,
  },
};

export default function RegistrationForm({ game, onSuccess, onBack }) {
  const { addRegistration } = useStore();
  const config = FORM_CONFIGS[game.id];
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1=form, 2=payment, 3=success
  const [generatedUID, setGeneratedUID] = useState("");

  const getFee = () => {
    if (config.dynamicFee) return config.dynamicFee(formData);
    return game.fee?.solo ? `₹${game.fee.solo} / ₹${game.fee.duo}` : `₹${game.fee}`;
  };

  const validate = () => {
    const errs = {};
    config.fields.forEach((f) => {
      if (f.required && !formData[f.name]) {
        errs[f.name] = "Required";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep(2);
  };

  const handlePaymentConfirm = () => {
    const uid = addRegistration({ ...formData, gameId: game.id, gameName: game.name, fee: getFee() });
    setGeneratedUID(uid);
    setStep(3);
  };

  if (step === 3) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{ fontSize: "4rem", marginBottom: 24 }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", marginBottom: 16 }}>
          Registration Confirmed!
        </h2>
        <div style={{
          background: "var(--bg-glass)", border: "2px solid var(--accent-1)",
          borderRadius: 8, padding: "32px", marginBottom: 32, display: "inline-block",
        }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "var(--text-secondary)", marginBottom: 8 }}>
            YOUR UNIQUE ID
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 900,
            color: "var(--accent-1)", letterSpacing: "0.2em",
            textShadow: "var(--accent-glow)",
          }}>
            {generatedUID}
          </div>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: 8, fontSize: "0.85rem" }}>
          Save this ID. You'll need it for match check-ins.
        </p>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: "0.8rem" }}>
          A confirmation has been noted for: {formData.captainEmail || formData.email}
        </p>
        <button className="btn btn-primary" onClick={onSuccess}>
          ← Back to Games
        </button>
      </div>
    );
  }

  if (step === 2) {
    const fee = config.dynamicFee ? config.dynamicFee(formData) : game.fee;
    return (
      <div style={{ maxWidth: 500, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", marginBottom: 8, fontSize: "1.3rem" }}>
          Complete Payment
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: 32 }}>
          Scan the QR below or use UPI ID to pay
        </p>

        <div className="card" style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 200, height: 200, margin: "0 auto 16px",
            background: "white", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.85rem", color: "#333",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 8 }}>📱</div>
              <div style={{ fontWeight: 700, color: "#000" }}>QR CODE</div>
              <div style={{ fontSize: "0.7rem", color: "#666" }}>Sample — Replace with</div>
              <div style={{ fontSize: "0.7rem", color: "#666" }}>your actual QR</div>
            </div>
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "0.8rem",
            color: "var(--text-secondary)", letterSpacing: "0.1em",
          }}>
            UPI ID: <span style={{ color: "var(--accent-1)" }}>nexabattle@upi</span>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Game</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem" }}>{game.name}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Team / Player</span>
            <span style={{ fontSize: "0.85rem" }}>{formData.teamName || formData.playerName || formData.participantName}</span>
          </div>
          <div style={{ height: 1, background: "var(--border-color)", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>TOTAL</span>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 900,
              fontSize: "1.3rem", color: "var(--accent-1)",
            }}>₹{fee}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>← Back</button>
          <button className="btn btn-primary" onClick={handlePaymentConfirm} style={{ flex: 2 }}>
            ✅ I've Paid — Confirm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        marginBottom: 32,
      }}>
        <span style={{ fontSize: "2.5rem" }}>{game.icon}</span>
        <div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "1.3rem",
            color: game.color,
          }}>{game.name} Registration</h2>
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{game.mode} • {game.feeType !== "flexible" ? `₹${game.fee} per team` : `₹${game.fee?.solo} solo / ₹${game.fee?.duo} duo`}</p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16, marginBottom: 32,
      }}>
        {config.fields.map((field) => (
          <div key={field.name} className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              {field.label} {field.required && <span style={{ color: "var(--accent-2)" }}>*</span>}
            </label>
            {field.type === "select" ? (
              <select
                className="input"
                value={formData[field.name] || ""}
                onChange={(e) => { setFormData({ ...formData, [field.name]: e.target.value }); setErrors({ ...errors, [field.name]: "" }); }}
              >
                <option value="">Select...</option>
                {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input
                className="input"
                type={field.type}
                placeholder={field.placeholder || ""}
                value={formData[field.name] || ""}
                onChange={(e) => { setFormData({ ...formData, [field.name]: e.target.value }); setErrors({ ...errors, [field.name]: "" }); }}
                style={{ borderColor: errors[field.name] ? "var(--accent-2)" : undefined }}
              />
            )}
            {errors[field.name] && (
              <div style={{ color: "var(--accent-2)", fontSize: "0.7rem", marginTop: 4 }}>
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn btn-outline" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 1 }}>
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}
