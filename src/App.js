import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import RegisterPage from "./pages/RegisterPage";
import SchedulePage from "./pages/SchedulePage";
import RulesPage from "./pages/RulesPage";
import FAQPage from "./pages/FAQPage";
import AdminPage from "./pages/AdminPage";
import "./styles.css";

function AppInner() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedGame, setSelectedGame] = useState(null);

  const setPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showFooter = currentPage !== "admin";
  const showNavbar = currentPage !== "admin";

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setPage={setPage} setSelectedGame={setSelectedGame} />;
      case "games":
        return <GamesPage setPage={setPage} setSelectedGame={setSelectedGame} />;
      case "register":
        return <RegisterPage selectedGame={selectedGame} setSelectedGame={setSelectedGame} setPage={setPage} />;
      case "schedule":
        return <SchedulePage />;
      case "rules":
        return <RulesPage />;
      case "faq":
        return <FAQPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage setPage={setPage} setSelectedGame={setSelectedGame} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      {showNavbar && <Navbar currentPage={currentPage} setPage={setPage} />}
      <main>{renderPage()}</main>
      {showFooter && <Footer setPage={setPage} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <AppInner />
      </StoreProvider>
    </ThemeProvider>
  );
}
