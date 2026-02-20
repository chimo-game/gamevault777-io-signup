"use client";

import { useEffect, useState } from "react";

// ⑤ SECURITY
export function SecurityScreen({ isActive, onNext }) {
  const [checks, setChecks] = useState([
    { id: "sc1", text: "Device security verified", active: false, done: false },
    {
      id: "sc2",
      text: "Location compliance checked",
      active: false,
      done: false,
    },
    {
      id: "sc3",
      text: "Account eligibility confirmed",
      active: false,
      done: false,
    },
    {
      id: "sc4",
      text: "Identity confirmation required",
      active: false,
      done: false,
    },
  ]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    setShowAlert(false);

    let timeouts = [];
    const ds = [500, 1050, 1600, 2200];

    ds.forEach((d, index) => {
      timeouts.push(
        setTimeout(() => {
          setChecks((prev) =>
            prev.map((s, i) => {
              if (i === index) return { ...s, active: true, done: false };
              if (i < index) return { ...s, active: false, done: true };
              return s;
            }),
          );
        }, d),
      );
    });

    timeouts.push(
      setTimeout(() => {
        setChecks((prev) =>
          prev.map((s, i) =>
            i === 3
              ? { ...s, active: false }
              : { ...s, active: false, done: true },
          ),
        );
        setShowAlert(true);
      }, 2900),
    );

    timeouts.push(
      setTimeout(() => {
        onNext();
      }, 4200),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isActive, onNext]);

  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="screen-security">
      <div className="topbar">
        <a className="brand" href="#">
          <img src="/logo.png" alt="Game Vault 777" className="brand-logo" />
          <div className="brand-name">GameVault 777</div>
        </a>
      </div>
      <div className="flow-bar">
        <div className="fseg done"></div>
        <div className="fseg done"></div>
        <div className="fseg done"></div>
        <div className="fseg done"></div>
        <div className="fseg active"></div>
      </div>
      <div className="flow-lbl">
        <span className="fl done">Sign Up</span>
        <span className="fl done">Processing</span>
        <span className="fl done">Success</span>
        <span className="fl done">Security</span>
        <span className="fl active">Verify</span>
      </div>
      <div
        className="content"
        style={{ justifyContent: "center", textAlign: "center", flex: "1" }}
      >
        <div className="sec-anim">
          <div className="sr1"></div>
          <div className="sr2"></div>
          <div className="sr3"></div>
          <div className="sec-em">
            <i
              className="ph-bold ph-magnifying-glass"
              style={{ color: "var(--text)" }}
            ></i>
          </div>
        </div>
        <div className="sec-title">Security Scan Running</div>
        <p className="sec-sub">
          Performing required compliance checks before releasing your bonus.
        </p>
        <div className="sec-checks">
          {checks.map((check) => (
            <div
              key={check.id}
              className={`sec-check ${check.active ? "active" : ""} ${
                check.done ? "done" : ""
              }`}
            >
              <div className="scdot">{check.done ? "✓" : "·"}</div>
              <span>{check.text}</span>
            </div>
          ))}
        </div>
        <div className={`sec-alert ${showAlert ? "show" : ""}`} id="secAlert">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <div className="sa-dot"></div>
            <div className="sa-title">Action Required</div>
          </div>
          <div className="sa-body">
            Your account is eligible. One final step:{" "}
            <strong>identity confirmation</strong> is required by gaming
            regulations before your $20 bonus can be released.
          </div>
        </div>
      </div>
    </div>
  );
}
