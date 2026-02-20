"use client";

import { useEffect, useState } from "react";

// ② PROCESSING
export function ProcessingScreen({ isActive, onNext }) {
  const [steps, setSteps] = useState([
    { id: "ps1", text: "Registering account", active: false, done: false },
    { id: "ps2", text: "Securing your data", active: false, done: false },
    { id: "ps3", text: "Preparing your $20 bonus", active: false, done: false },
    { id: "ps4", text: "Finalizing account setup", active: false, done: false },
  ]);

  useEffect(() => {
    if (!isActive) return;

    const delays = [300, 800, 1400, 1900];
    let timeouts = [];

    delays.forEach((delay, index) => {
      const t = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, i) => {
            if (i === index) return { ...s, active: true, done: false };
            if (i < index) return { ...s, active: false, done: true };
            return s;
          }),
        );
      }, delay);
      timeouts.push(t);
    });

    const finishTimeout = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) => ({ ...s, active: false, done: true })),
      );
    }, 2500);
    timeouts.push(finishTimeout);

    const nextTimeout = setTimeout(() => {
      onNext();
    }, 3100);
    timeouts.push(nextTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [isActive, onNext]);

  return (
    <div
      className={`screen ${isActive ? "active" : ""}`}
      id="screen-processing"
    >
      <div className="topbar">
        <a className="brand" href="#">
          <img src="/logo.png" alt="Game Vault 777" className="brand-logo" />
          <div className="brand-name">GameVault 777</div>
        </a>
      </div>
      <div className="flow-bar">
        <div className="fseg done"></div>
        <div className="fseg active"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
      </div>
      <div className="flow-lbl">
        <span className="fl done">Sign Up</span>
        <span className="fl active">Processing</span>
        <span className="fl">Activating</span>
        <span className="fl">Security</span>
        <span className="fl">Verify</span>
      </div>
      <div
        className="content"
        style={{ justifyContent: "center", textAlign: "center", flex: "1" }}
      >
        <div className="spin-anim">
          <div className="sp1"></div>
          <div className="sp2"></div>
          <div className="sp3"></div>
          <div className="sp-icon">
            <i
              className="ph-fill ph-gear"
              style={{ color: "var(--text)", fontSize: "32px" }}
            ></i>
          </div>
        </div>
        <div className="proc-title">Creating your account...</div>
        <p className="proc-sub">
          Sit tight — we're setting everything up for you.
        </p>
        <div className="proc-steps">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`proc-step ${step.active ? "active" : ""} ${
                step.done ? "done" : ""
              }`}
              id={step.id}
            >
              <div className="proc-dot">
                {step.done ? (
                  <i className="ph-bold ph-check"></i>
                ) : step.active ? (
                  <i className="ph-bold ph-spinner ph-spin"></i>
                ) : (
                  "·"
                )}
              </div>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
