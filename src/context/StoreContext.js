import React, { createContext, useContext, useState, useEffect } from "react";
import { SPONSORS, FAQS, RULES, EVENTS } from "../data/content";
import { GAMES } from "../data/games";

const StoreContext = createContext(null);

function generateUID(prefix) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uid = prefix + "-";
  for (let i = 0; i < 8; i++) uid += chars[Math.floor(Math.random() * chars.length)];
  return uid;
}

export function StoreProvider({ children }) {
  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem("registrations");
    return saved ? JSON.parse(saved) : [];
  });
  const [sponsors, setSponsors] = useState(SPONSORS);
  const [faqs, setFaqs] = useState(FAQS);
  const [rules, setRules] = useState(RULES);
  const [events, setEvents] = useState(EVENTS);
  const [games, setGames] = useState(GAMES);

  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  const addRegistration = (data) => {
    const prefix = data.gameId.toUpperCase().slice(0, 4);
    const uid = generateUID(prefix);
    const reg = { ...data, uid, id: Date.now(), createdAt: new Date().toISOString(), status: "pending" };
    setRegistrations((prev) => [...prev, reg]);
    return uid;
  };

  const updateRegistration = (id, updates) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRegistration = (id) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  // Sponsors CRUD
  const addSponsor = (s) => setSponsors((prev) => [...prev, { ...s, id: "s" + Date.now() }]);
  const updateSponsor = (id, u) => setSponsors((prev) => prev.map((s) => (s.id === id ? { ...s, ...u } : s)));
  const deleteSponsor = (id) => setSponsors((prev) => prev.filter((s) => s.id !== id));

  // FAQs CRUD
  const addFaq = (f) => setFaqs((prev) => [...prev, { ...f, id: "f" + Date.now() }]);
  const updateFaq = (id, u) => setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, ...u } : f)));
  const deleteFaq = (id) => setFaqs((prev) => prev.filter((f) => f.id !== id));

  // Events CRUD
  const addEvent = (e) => setEvents((prev) => [...prev, { ...e, id: "e" + Date.now() }]);
  const updateEvent = (id, u) => setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...u } : e)));
  const deleteEvent = (id) => setEvents((prev) => prev.filter((e) => e.id !== id));

  // Games CRUD
  const updateGame = (id, u) => setGames((prev) => prev.map((g) => (g.id === id ? { ...g, ...u } : g)));

  return (
    <StoreContext.Provider value={{
      registrations, addRegistration, updateRegistration, deleteRegistration,
      sponsors, addSponsor, updateSponsor, deleteSponsor,
      faqs, addFaq, updateFaq, deleteFaq,
      rules, setRules,
      events, addEvent, updateEvent, deleteEvent,
      games, updateGame,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
