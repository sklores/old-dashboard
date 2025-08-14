// src/App.tsx
import React from "react";
import Dashboard from "./Dashboard";

// ✅ New scenic-vista TopBar (from components/topbar/TopBar.tsx)
import { TopBar } from "./components/topbar/TopBar";

// ⬇️ Old TopBar (keep for reference until v2 is stable)
// import TopBar from "./ui/TopBar";

// BottomBar (still in ui)
import BottomBar from "./ui/BottomBar";

// Global styles
import "./styles.css";

export default function App() {
  return (
    <div style={{ background: "#121314", minHeight: "100vh" }}>
      {/* Top navigation / logos / weather */}
      <TopBar
        timeOfDay="day"
        weather="clear"
        salesRatio={0.35}
        laborScore={62}
        isSyncing={false}
        beamTrigger={0}
      />

      {/* Main dashboard */}
      <Dashboard />

      {/* Bottom actions/status bar */}
      <BottomBar />
    </div>
  );
}