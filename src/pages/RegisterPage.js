import React, { useState } from "react";
import GameCard from "../components/GameCard";
import RegistrationForm from "../components/RegistrationForm";
import { GAMES } from "../data/games";

export default function RegisterPage({ selectedGame, setSelectedGame, setPage }) {
  const [activeGame, setActiveGame] = useState(selectedGame || null);

  const handleBack = () => {
    setActiveGame(null);
    setSelectedGame(null);
  };

  if (activeGame) {
    return (
      <div style={{ paddingTop: 100, minHeight: "100vh" }}>
        <div className="container" style={{ maxWidth: 900, padding: "40px 24px" }}>
          <RegistrationForm
            game={activeGame}
            onSuccess={() => { handleBack(); setPage("games"); }}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <div className="container section">
        <p className="section-subtitle">Join The Battle</p>
        <h2 className="section-title">Select A Game To Register</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {GAMES.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => setActiveGame(game)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
