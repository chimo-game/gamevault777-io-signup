"use client";

import { useState } from "react";
import Script from "next/script";
import "./globals.css";

import { SignupScreen } from "./components/SignupScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { ActivatingScreen } from "./components/ActivatingScreen";
import { SecurityScreen } from "./components/SecurityScreen";
import { LockerScreen } from "./components/LockerScreen";
import { ActivatedScreen } from "./components/ActivatedScreen";

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState("signup");
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    country: "US",
  });

  const goTo = (screen) => {
    setCurrentScreen(screen);
  };

  const [transitioning, setTransitioning] = useState("");

  const navigate = (nextScreen) => {
    setTransitioning("out");
    setTimeout(() => {
      setCurrentScreen(nextScreen);
      setTransitioning("in");
      setTimeout(() => setTransitioning(""), 300);
    }, 300);
  };

  return (
    <>
      <main className={`screen-container ${transitioning}`}>
        {currentScreen === "signup" && (
          <SignupScreen
            isActive={currentScreen === "signup"}
            onNext={() => navigate("processing")}
            setUserData={setUserData}
          />
        )}

        {currentScreen === "processing" && (
          <ProcessingScreen
            isActive={currentScreen === "processing"}
            onNext={() => navigate("success")}
          />
        )}

        {currentScreen === "success" && (
          <SuccessScreen
            isActive={currentScreen === "success"}
            onNext={() => navigate("activating")}
          />
        )}

        {currentScreen === "activating" && (
          <ActivatingScreen
            isActive={currentScreen === "activating"}
            onNext={() => navigate("security")}
          />
        )}

        {currentScreen === "security" && (
          <SecurityScreen
            isActive={currentScreen === "security"}
            onNext={() => navigate("locker")}
          />
        )}

        {currentScreen === "locker" && (
          <LockerScreen
            isActive={currentScreen === "locker"}
            onNext={() => navigate("activated")}
            userData={userData}
          />
        )}

        {currentScreen === "activated" && (
          <ActivatedScreen
            isActive={currentScreen === "activated"}
            userData={userData}
          />
        )}
      </main>

      {/* Keeping main.js only for global side effects if any, though most logic is ported */}
    </>
  );
}
