import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { SettingsModal } from "./components/SettingModal";
import LoginDetailForm from "./components/LoginDetailForm";
import LibraryCompo from "./components/LibraryCompo";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState("settings");

  return (
   <LibraryCompo/>
  );
}
