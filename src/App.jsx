import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("settings");

  return (
    <>
      <LandingPage/>
    </>
  );
}
