"use client";

import { useEffect, useState } from "react";

// ④ ACTIVATING
export function ActivatingScreen({ isActive, onNext }) {
  const [bonusSteps, setBonusSteps] = useState([
    {
      id: "ai1",
      name: "Game library access",
      desc: "500+ slots, fish & table games",
      icon: <i className="ph-fill ph-game-controller"></i>,
      status: "Pending",
      state: "",
    },
    {
      id: "ai2",
      name: "Welcome bonus ($20)",
      desc: "No deposit required",
      icon: (
        <img
          src="dollar.png"
          alt="Dollar"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ),
      status: "Pending",
      state: "",
      p: "4px",
    },
    {
      id: "ai3",
      name: "VIP rewards program",
      desc: "Earn points on every game",
      icon: <i className="ph-fill ph-trophy"></i>,
      status: "Pending",
      state: "",
    },
    {
      id: "ai4",
      name: "Identity verification",
      desc: "Required for bonus release",
      icon: <i className="ph-fill ph-lock-key"></i>,
      status: "Pending",
      state: "",
    },
  ]);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("Preparing your welcome bonus...");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Reset state
    setProgress(0);
    setMsg("Preparing your welcome bonus...");
    setPaused(false);
    setBonusSteps((prev) =>
      prev.map((s) => ({ ...s, status: "Pending", state: "" })),
    );

    let timers = [];
    const msgs = [
      "Preparing welcome bonus...",
      "Loading game library...",
      "Applying VIP rewards...",
      "Almost ready...",
    ];

    // Simulate steps completion
    const items = [{ d: 350 }, { d: 850 }, { d: 1350 }, { d: 1850 }];

    items.forEach((item, i) => {
      timers.push(
        setTimeout(() => {
          setBonusSteps((prev) =>
            prev.map((s, idx) => (idx === i ? { ...s, state: "current" } : s)),
          );
        }, item.d),
      );

      timers.push(
        setTimeout(() => {
          setBonusSteps((prev) =>
            prev.map((s, idx) => {
              if (idx === i)
                return {
                  ...s,
                  state: "done",
                  status: i < 3 ? "✓ Loaded" : "⏳ Pending",
                };
              return s;
            }),
          );
        }, item.d + 550),
      );
    });

    // Progress bar
    let msgIdx = 0;
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      if (currentProgress >= 99) {
        clearInterval(progressInterval);
        return;
      }
      const speed =
        currentProgress < 80 ? 1.8 : currentProgress < 95 ? 0.4 : 0.08;
      currentProgress = Math.min(currentProgress + speed, 99);
      setProgress(currentProgress);

      if (currentProgress > msgIdx * 25 && msgIdx < msgs.length) {
        setMsg(msgs[msgIdx]);
        msgIdx++;
      }
    }, 80);

    // Pause and transition
    timers.push(
      setTimeout(() => {
        setMsg("⏸ Waiting for identity confirmation...");
        setPaused(true);
        timers.push(
          setTimeout(() => {
            onNext();
          }, 2200),
        );
      }, 3600),
    );

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, [isActive, onNext]);

  return (
    <div
      className={`screen ${isActive ? "active" : ""}`}
      id="screen-activating"
    >
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
        <div className="fseg active"></div>
        <div className="fseg"></div>
      </div>
      <div className="flow-lbl">
        <span className="fl done">Sign Up</span>
        <span className="fl done">Processing</span>
        <span className="fl done">Success</span>
        <span className="fl active">Security</span>
        <span className="fl">Verify</span>
      </div>
      <div className="content">
        <div
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "6px",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          <i
            className="ph-fill ph-lightning"
            style={{
              color: "var(--gold)",
              fontSize: "24px",
              marginRight: "4px",
            }}
          ></i>{" "}
          Activating Your Account
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-sub)",
            lineHeight: 1.6,
            textAlign: "center",
            maxWidth: "300px",
            margin: "0 auto 28px",
          }}
        >
          Loading your gaming profile and bonuses...
        </p>
        <div className="bpc">
          <div className="bpc-top">
            <div className="bpc-title">
              <i
                className="ph-fill ph-gift"
                style={{
                  fontSize: "16px",
                  color: "var(--gold)",
                  marginRight: "2px",
                }}
              ></i>{" "}
              Bonus Loading
            </div>
            <div className="bpc-pct">{Math.floor(progress)}%</div>
          </div>
          <div className="bpc-track">
            <div className="bpc-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="bpc-msg">{msg}</div>
          <div className={`bpc-paused ${paused ? "show" : ""}`}>
            <strong>
              <i className="ph-bold ph-pause"></i> Almost there!
            </strong>{" "}
            Your $20 bonus is loaded — we just need to verify your identity
            before releasing it. One quick step below.
          </div>
        </div>
        <div className="act-list" style={{ marginTop: "16px" }}>
          {bonusSteps.map((step) => (
            <div
              key={step.id}
              className={`act-item ${step.state}`}
              id={step.id}
            >
              <div className="act-iw" style={{ padding: step.p || 0 }}>
                {step.icon}
              </div>
              <div>
                <div className="act-name">{step.name}</div>
                <div className="act-desc-s">{step.desc}</div>
              </div>
              <div className="act-status">{step.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
