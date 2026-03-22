import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { GAMES } from "../data/games";

const ADMIN_PASSWORD = "nexabattle2025";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [activeTab, setActiveTab] = useState("registrations");

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(""); }
    else setPwError("Incorrect password. Try: nexabattle2025");
  };

  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--bg-primary)",
      }}>
        <div className="card" style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔐</div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)" }}>Admin Access</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginTop: 8 }}>
              NexaBattle Tournament Control Panel
            </p>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter admin password"
            />
            {pwError && <div style={{ color: "var(--accent-2)", fontSize: "0.75rem", marginTop: 6 }}>{pwError}</div>}
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleLogin}>
            Access Admin Panel
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
}

function AdminDashboard({ activeTab, setActiveTab }) {
  const store = useStore();

  const tabs = [
    { id: "registrations", label: "Registrations", icon: "📋" },
    { id: "games", label: "Games", icon: "🎮" },
    { id: "sponsors", label: "Sponsors", icon: "🤝" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "faqs", label: "FAQs", icon: "❓" },
    { id: "rules", label: "Rules", icon: "📜" },
  ];

  return (
    <div style={{ paddingTop: 80, minHeight: "100vh", background: "var(--bg-secondary)" }}>
      {/* Header */}
      <div style={{
        background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)",
        padding: "16px 24px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: "1.5rem" }}>⚙️</span>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--accent-1)" }}>
              Admin Panel
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>NexaBattle Tournament Management</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="btn btn-sm"
                style={{
                  background: activeTab === t.id ? "var(--btn-primary)" : "transparent",
                  color: activeTab === t.id ? "var(--btn-primary-text)" : "var(--text-secondary)",
                  border: `1px solid ${activeTab === t.id ? "transparent" : "var(--border-color)"}`,
                }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "registrations" && <RegistrationsTab store={store} />}
        {activeTab === "games" && <GamesTab store={store} />}
        {activeTab === "sponsors" && <SponsorsTab store={store} />}
        {activeTab === "events" && <EventsTab store={store} />}
        {activeTab === "faqs" && <FAQsTab store={store} />}
        {activeTab === "rules" && <RulesTab store={store} />}
      </div>
    </div>
  );
}

// --- Registrations Tab ---
function RegistrationsTab({ store }) {
  const { registrations, updateRegistration, deleteRegistration } = store;
  const [gameFilter, setGameFilter] = useState("all");

  const filtered = gameFilter === "all" ? registrations : registrations.filter((r) => r.gameId === gameFilter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", fontSize: "1.3rem" }}>
            Registrations
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
            Total: {registrations.length} registrations
          </p>
        </div>
        <select
          className="input"
          value={gameFilter}
          onChange={(e) => setGameFilter(e.target.value)}
          style={{ maxWidth: 200 }}
        >
          <option value="all">All Games</option>
          {GAMES.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-secondary)" }}>
          No registrations yet.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr>
                {["UID", "Game", "Team/Player", "Captain/Player", "Phone", "Email", "Fee", "Status", "Actions"].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px", textAlign: "left",
                    fontFamily: "var(--font-display)", fontSize: "0.65rem",
                    letterSpacing: "0.1em", color: "var(--text-secondary)",
                    borderBottom: "1px solid var(--border-color)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={reg.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-display)", color: "var(--accent-1)", fontSize: "0.75rem" }}>
                    {reg.uid}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{reg.gameName}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700 }}>
                    {reg.teamName || reg.playerName || reg.participantName || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {reg.captainName || reg.participantName || reg.playerName || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {reg.captainPhone || reg.phone || "—"}
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>
                    {reg.captainEmail || reg.email || "—"}
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--accent-3)", fontFamily: "var(--font-display)" }}>
                    ₹{typeof reg.fee === "number" ? reg.fee : reg.fee}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <select
                      value={reg.status}
                      onChange={(e) => updateRegistration(reg.id, { status: e.target.value })}
                      style={{
                        background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                        borderRadius: 4, color: reg.status === "confirmed" ? "#00ff41" : reg.status === "pending" ? "#ffa500" : "#ff3232",
                        fontFamily: "var(--font-display)", fontSize: "0.65rem", padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => window.confirm("Delete this registration?") && deleteRegistration(reg.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Games Tab ---
function GamesTab({ store }) {
  const { games, updateGame } = store;
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", marginBottom: 24, fontSize: "1.3rem" }}>
        Manage Games
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {games.map((game) => (
          <div key={game.id} className="card">
            {editing === game.id ? (
              <div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="input"
                    rows={3}
                    value={editData.description ?? game.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Max Teams (if applicable)</label>
                  <input
                    className="input"
                    type="number"
                    value={editData.maxTeams ?? game.maxTeams ?? ""}
                    onChange={(e) => setEditData({ ...editData, maxTeams: e.target.value ? +e.target.value : null })}
                  />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-primary btn-sm" onClick={() => { updateGame(game.id, editData); setEditing(null); setEditData({}); }}>
                    Save
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => { setEditing(null); setEditData({}); }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: "2rem" }}>{game.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", color: game.color, fontWeight: 700 }}>{game.name}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{game.mode} • {game.platform}</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
                  {game.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", color: game.color, fontSize: "0.9rem" }}>
                    ₹{game.fee?.solo ? `${game.fee.solo}/${game.fee.duo}` : game.fee}
                  </span>
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(game.id)}>Edit</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Sponsors Tab ---
function SponsorsTab({ store }) {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = store;
  const [showAdd, setShowAdd] = useState(false);
  const [newS, setNewS] = useState({ name: "", logo: "🏢", tier: "silver", website: "#" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", fontSize: "1.3rem" }}>Sponsors</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Add Sponsor</button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h4 style={{ fontFamily: "var(--font-display)", marginBottom: 16, fontSize: "0.85rem" }}>New Sponsor</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Name</label>
              <input className="input" value={newS.name} onChange={(e) => setNewS({ ...newS, name: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Logo (Emoji)</label>
              <input className="input" value={newS.logo} onChange={(e) => setNewS({ ...newS, logo: e.target.value })} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Tier</label>
              <select className="input" value={newS.tier} onChange={(e) => setNewS({ ...newS, tier: e.target.value })}>
                {["platinum", "gold", "silver", "bronze"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Website</label>
              <input className="input" value={newS.website} onChange={(e) => setNewS({ ...newS, website: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 16 }} onClick={() => { addSponsor(newS); setShowAdd(false); setNewS({ name: "", logo: "🏢", tier: "silver", website: "#" }); }}>
            Add
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {sponsors.map((s) => (
          <div key={s.id} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>{s.logo}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 8 }}>{s.name}</div>
            <span className={`badge badge-${s.tier}`} style={{ marginBottom: 16, display: "inline-block" }}>{s.tier}</span>
            <br />
            <button className="btn btn-danger btn-sm" onClick={() => deleteSponsor(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Events Tab ---
function EventsTab({ store }) {
  const { events, addEvent, updateEvent, deleteEvent } = store;
  const [showAdd, setShowAdd] = useState(false);
  const [newE, setNewE] = useState({ title: "", date: "", time: "", description: "", type: "match" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", fontSize: "1.3rem" }}>Events</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Add Event</button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 16 }}>
            {[
              { key: "title", label: "Title", type: "text" },
              { key: "date", label: "Date", type: "date" },
              { key: "time", label: "Time", type: "text", placeholder: "e.g. 3:00 PM" },
              { key: "description", label: "Description", type: "text" },
            ].map((f) => (
              <div key={f.key} className="form-group" style={{ margin: 0 }}>
                <label className="form-label">{f.label}</label>
                <input className="input" type={f.type} placeholder={f.placeholder} value={newE[f.key]} onChange={(e) => setNewE({ ...newE, [f.key]: e.target.value })} />
              </div>
            ))}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Type</label>
              <select className="input" value={newE.type} onChange={(e) => setNewE({ ...newE, type: e.target.value })}>
                {["registration", "deadline", "announcement", "match", "finals"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => { addEvent(newE); setShowAdd(false); }}>Add Event</button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {events.map((e) => (
          <div key={e.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, padding: "16px 20px" }}>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.65rem", color: "var(--accent-1)", letterSpacing: "0.1em", display: "block", marginBottom: 2 }}>
                {e.type?.toUpperCase()} • {e.date}
              </span>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>{e.title}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{e.description}</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteEvent(e.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- FAQs Tab ---
function FAQsTab({ store }) {
  const { faqs, addFaq, updateFaq, deleteFaq } = store;
  const [showAdd, setShowAdd] = useState(false);
  const [newF, setNewF] = useState({ question: "", answer: "", category: "general" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", fontSize: "1.3rem" }}>FAQs</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(!showAdd)}>+ Add FAQ</button>
      </div>

      {showAdd && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div className="form-group">
            <label className="form-label">Question</label>
            <input className="input" value={newF.question} onChange={(e) => setNewF({ ...newF, question: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Answer</label>
            <textarea className="input" rows={3} value={newF.answer} onChange={(e) => setNewF({ ...newF, answer: e.target.value })} style={{ resize: "vertical" }} />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input className="input" value={newF.category} onChange={(e) => setNewF({ ...newF, category: e.target.value })} placeholder="e.g. registration, payment, teams" />
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => { addFaq(newF); setShowAdd(false); setNewF({ question: "", answer: "", category: "general" }); }}>Add</button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((f) => (
          <div key={f.id} className="card" style={{ padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{f.question}</div>
              <button className="btn btn-danger btn-sm" onClick={() => deleteFaq(f.id)}>Delete</button>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>{f.answer}</p>
            <span className="badge badge-pending" style={{ fontSize: "0.6rem" }}>{f.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Rules Tab ---
function RulesTab({ store }) {
  const { rules, setRules } = store;
  const [activeGame, setActiveGame] = useState("general");
  const [newRule, setNewRule] = useState("");

  const tabs = [
    { id: "general", label: "General", icon: "📜" },
    ...GAMES.map((g) => ({ id: g.id, label: g.name, icon: g.icon })),
  ];

  const addRule = () => {
    if (!newRule.trim()) return;
    setRules({ ...rules, [activeGame]: [...(rules[activeGame] || []), newRule.trim()] });
    setNewRule("");
  };

  const removeRule = (idx) => {
    setRules({ ...rules, [activeGame]: rules[activeGame].filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", color: "var(--accent-1)", marginBottom: 24, fontSize: "1.3rem" }}>Rules</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveGame(t.id)} className="btn btn-sm"
            style={{
              background: activeGame === t.id ? "var(--btn-primary)" : "transparent",
              color: activeGame === t.id ? "var(--btn-primary-text)" : "var(--text-secondary)",
              border: `1px solid ${activeGame === t.id ? "transparent" : "var(--border-color)"}`,
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="card">
        {(rules[activeGame] || []).map((rule, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <span style={{ color: "var(--accent-1)", fontFamily: "var(--font-display)", fontSize: "0.8rem", minWidth: 24 }}>{i + 1}.</span>
            <span style={{ flex: 1, fontSize: "0.85rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>{rule}</span>
            <button className="btn btn-danger btn-sm" onClick={() => removeRule(i)}>✕</button>
          </div>
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <input
            className="input"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRule()}
            placeholder="Add a new rule..."
          />
          <button className="btn btn-primary" onClick={addRule}>Add</button>
        </div>
      </div>
    </div>
  );
}
