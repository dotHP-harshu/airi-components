import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { SettingsModal } from "./components/SettingModal";
import LoginDetailForm from "./components/LoginDetailForm";
import LibraryCompo from "./components/LibraryCompo";
import AppsCompo from "./components/AppsCompo";
import AppDetailCompo from "./components/appsSection/AppDetailCompo";
import MemoryCompo from "./components/MemoryCompo";
import LandingPage from "./components/LandingPage";
import HeroBackground from "./components/landingPage/HeroBackground";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("settings");

  return (
    <>
      {/* <SettingsModal /> */}
      {/* <LoginDetailForm /> */}
      {/* <AppsCompo/> */}
      {/* <LibraryCompo /> */}
      {/* <MemoryCompo /> */}
      <LandingPage/>
    </>
  );
}
