"use client";

import { useEffect, useState } from "react";

// ⑦ ACTIVATED
export function ActivatedScreen({ isActive, userData }) {
  const [redirectCount, setRedirectCount] = useState(10);

  // Name and Email Display
  const fullName = userData?.fname
    ? `${userData.fname} ${userData.lname}`
    : "New Player";
  const displayEmail = userData?.email
    ? userData.email
    : "player@gamevault777.com";
  const country = userData?.country || "United States";

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    if (!isActive) return;

    // Confetti
    spawnConfetti();

    // Countdown
    setRedirectCount(10);
    const iv = setInterval(() => {
      setRedirectCount((prev) => {
        if (prev <= 1) {
          clearInterval(iv);
          enterVault();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(iv);
  }, [isActive]);

  const enterVault = () => {
    window.location.href = "/dashboard";
  };

  const spawnConfetti = () => {
    const c = document.getElementById("confettiEl");
    if (!c) return;
    c.innerHTML = ""; // clear previous

    const cols = [
      "#F5B800",
      "#D97706",
      "#FDE68A",
      "#22C55E",
      "#60A5FA",
      "#ffffff",
    ];
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        const p = document.createElement("div");
        p.className = "cp";
        const sz = Math.random() * 8 + 4;
        p.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${
          cols[Math.floor(Math.random() * cols.length)]
        };width:${sz}px;height:${sz}px;border-radius:${
          Math.random() > 0.5 ? "50%" : "2px"
        };animation-duration:${Math.random() * 2 + 2.5}s;animation-delay:${
          Math.random() * 0.5
        }s;`;
        c.appendChild(p);
        setTimeout(() => p.remove(), 5500);
      }, i * 25);
    }
  };

  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="screen-activated">
      <div className="confetti-el" id="confettiEl"></div>
      <div className="activated-wrap">
        {/* Big check */}
        <div className="act-check-ring">
          <div className="act-check-ring-anim"></div>
          <div className="act-check-circle">
            <i className="ph-bold ph-check"></i>
          </div>
        </div>

        <h1 className="activated-title">
          Account <span className="g">Activated!</span>
        </h1>
        <p className="activated-sub">
          Welcome, {userData?.fname || "Player"}! Identity confirmed. Your $20
          welcome bonus has been credited and is ready to use.
        </p>

        {/* User info card */}
        <div className="user-info-card">
          <div className="uic-header">
            <div className="uic-avatar">
              <i className="ph-fill ph-slots"></i>
            </div>
            <div>
              <div className="uic-name">{fullName}</div>
              <div className="uic-email">{displayEmail}</div>
            </div>
            <div className="uic-verified">✓ Verified</div>
          </div>
          <div className="uic-rows">
            <div className="uic-row">
              <div className="uic-row-lbl">
                <span style={{ marginRight: "2px", display: "flex" }}>
                  <img
                    src="dollar.png"
                    alt="Dollar"
                    style={{
                      width: "16px",
                      height: "16px",
                      objectFit: "contain",
                    }}
                  />
                </span>{" "}
                Welcome Bonus
              </div>
              <div className="uic-row-val gold">$20 FREE</div>
            </div>
            <div className="uic-row">
              <div className="uic-row-lbl">
                <span style={{ marginRight: "2px", display: "flex" }}>
                  <i
                    className="ph-fill ph-calendar-blank"
                    style={{ fontSize: "16px" }}
                  ></i>
                </span>{" "}
                Member Since
              </div>
              <div className="uic-row-val">{today}</div>
            </div>
            <div className="uic-row">
              <div className="uic-row-lbl">
                <span style={{ marginRight: "2px", display: "flex" }}>
                  <i
                    className="ph-fill ph-globe-hemisphere-west"
                    style={{ fontSize: "16px" }}
                  ></i>
                </span>{" "}
                Region
              </div>
              <div className="uic-row-val">{country}</div>
            </div>
            <div className="uic-row">
              <div className="uic-row-lbl">
                <span style={{ marginRight: "2px", display: "flex" }}>
                  <i
                    className="ph-fill ph-lock-key"
                    style={{ fontSize: "16px" }}
                  ></i>
                </span>{" "}
                Identity Status
              </div>
              <div className="uic-row-val green">
                <i className="ph-bold ph-check"></i> Fully Verified
              </div>
            </div>
          </div>
        </div>

        {/* Bonus breakdown */}
        <div className="bonus-cards-row">
          <div className="bonus-card-sm">
            <div className="bcs-icon">
              <img
                src="dollar.png"
                alt="Dollar"
                style={{ width: "28px", height: "28px", objectFit: "contain" }}
              />
            </div>
            <div className="bcs-lbl">Welcome Bonus</div>
            <div className="bcs-val">$20</div>
            <div className="bcs-desc">In your wallet now</div>
          </div>
          <div className="bonus-card-sm">
            <div className="bcs-icon">
              <i className="ph-fill ph-game-controller"></i>
            </div>
            <div className="bcs-lbl">Games Unlocked</div>
            <div className="bcs-val">500+</div>
            <div className="bcs-desc">Slots, fish & tables</div>
          </div>
          <div className="bonus-card-sm">
            <div className="bcs-icon">
              <i className="ph-fill ph-trophy"></i>
            </div>
            <div className="bcs-lbl">VIP Status</div>
            <div className="bcs-val">Active</div>
            <div className="bcs-desc">Earn points today</div>
          </div>
        </div>

        {/* Email sent confirmation */}
        <div className="email-sent-card">
          <div className="esc-icon">
            <i className="ph-fill ph-envelope-simple"></i>
          </div>
          <div className="esc-info">
            <div className="esc-title">Confirmation Email Sent</div>
            <div className="esc-sub">
              Your account details have been sent to {displayEmail}
            </div>
          </div>
          <div className="esc-check">
            <i className="ph-bold ph-check"></i>
          </div>
        </div>

        {/* Enter vault button */}
        <button className="enter-btn" onClick={enterVault}>
          <i className="ph-fill ph-slots" style={{ marginRight: "4px" }}></i>
          &nbsp;Enter Game Vault 777
        </button>

        {/* Auto-redirect progress */}
        <div className="redir-wrap">
          <div className="redir-track">
            <div
              className="redir-fill"
              style={{ width: `${((10 - redirectCount) / 10) * 100}%` }}
            ></div>
          </div>
          <p className="redir-txt">
            Redirecting automatically in <b>{redirectCount}</b>s...
          </p>
        </div>
      </div>
    </div>
  );
}
