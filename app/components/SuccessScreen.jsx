"use client";

// ③ SUCCESS
export function SuccessScreen({ isActive, onNext }) {
  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="screen-success">
      <div className="topbar">
        <a className="brand" href="#">
          <img src="/logo.png" alt="Game Vault 777" className="brand-logo" />
          <div className="brand-name">GameVault 777</div>
        </a>
      </div>
      <div className="flow-bar">
        <div className="fseg done"></div>
        <div className="fseg done"></div>
        <div className="fseg active"></div>
        <div className="fseg"></div>
        <div className="fseg"></div>
      </div>
      <div className="flow-lbl">
        <span className="fl done">Sign Up</span>
        <span className="fl done">Processing</span>
        <span className="fl active">Activating</span>
        <span className="fl">Security</span>
        <span className="fl">Verify</span>
      </div>
      <div
        className="content"
        style={{ justifyContent: "center", textAlign: "center", flex: "1" }}
      >
        <div className="suc-ring">
          <div className="suc-ring-anim"></div>
          <div className="suc-circle">
            <i className="ph-bold ph-check"></i>
          </div>
        </div>
        <div className="suc-title">
          Account <span className="grn">Created!</span>
        </div>
        <p className="suc-sub">
          Your Game Vault 777 account has been created. One final step to
          activate your $20 bonus.
        </p>
        <div className="stat-row">
          <div className="stat-box">
            <div className="stat-val">$20</div>
            <div className="stat-lbl">Bonus Ready</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">500+</div>
            <div className="stat-lbl">Games</div>
          </div>
          <div className="stat-box">
            <div className="stat-val">24/7</div>
            <div className="stat-lbl">Support</div>
          </div>
        </div>
        <button className="primary-btn" onClick={onNext}>
          Continue to Activate →
        </button>
      </div>
    </div>
  );
}
