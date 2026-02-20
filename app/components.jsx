<>
  {/*  ① SIGN UP  */}
  <div className="screen active" id="screen-signup">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
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
          <div className="bc-desc">No deposit needed — credited on signup</div>
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
              className="inp"
              id="inp-email"
              type="email"
              placeholder="john@email.com"
              autoComplete="email"
              style={{ paddingRight: "40px" }}
            />
            <div className="inp-icon" id="email-icon"></div>
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
          />
          <div className="pwd-bar">
            <div className="pwd-fill" id="pwd-fill"></div>
          </div>
          <div className="pwd-lbl" id="pwd-lbl">
            Enter a password
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
          >
            <option value="">Select your country</option>
            <option value="US" defaultValue="US">
              🇺🇸 United States
            </option>
            <option value="GB">🇬🇧 United Kingdom</option>
            <option value="CA">🇨🇦 Canada</option>
            <option value="AU">🇦🇺 Australia</option>
            <option value="NZ">🇳🇿 New Zealand</option>
            <option value="IE">🇮🇪 Ireland</option>
            <option value="other">🌍 Other</option>
          </select>
        </div>
        <label className="chk-row" onClick="toggleCheck('tos-chk')">
          <div className="chk-box" id="tos-chk"></div>
          <span>
            I agree to the <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>. I confirm I am 21+ years of age.
          </span>
        </label>
        <label className="chk-row" onClick="toggleCheck('mkt-chk')">
          <div className="chk-box checked" id="mkt-chk">
            <i className="ph-bold ph-check" style={{ fontSize: "10px" }}></i>
          </div>
          <span>Send me exclusive bonuses and promotional offers</span>
        </label>
        <button className="primary-btn" id="signupBtn" onClick="submitSignup()">
          <i className="ph-fill ph-slots" style={{ marginRight: "4px" }}></i>{" "}
          &nbsp;Create Free Account
        </button>
        <div className="login-link">
          Already have an account? <a href="#">Sign in</a>
        </div>
      </div>
    </div>
  </div>

  {/*  ② PROCESSING  */}
  <div className="screen" id="screen-processing">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
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
        <div className="proc-step" id="ps1">
          <div className="proc-dot">·</div>
          <span>Registering account</span>
        </div>
        <div className="proc-step" id="ps2">
          <div className="proc-dot">·</div>
          <span>Securing your data</span>
        </div>
        <div className="proc-step" id="ps3">
          <div className="proc-dot">·</div>
          <span>Preparing your $20 bonus</span>
        </div>
        <div className="proc-step" id="ps4">
          <div className="proc-dot">·</div>
          <span>Finalizing account setup</span>
        </div>
      </div>
    </div>
  </div>

  {/*  ③ SUCCESS  */}
  <div className="screen" id="screen-success">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
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
        Your Game Vault 777 account has been created. One final step to activate
        your $20 bonus.
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
      <button className="primary-btn" onClick="goTo('activating')">
        Continue to Activate →
      </button>
    </div>
  </div>

  {/*  ④ ACTIVATING  */}
  <div className="screen" id="screen-activating">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
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
          fontWeight: "800",
          color: "var(--text)",
          marginBottom: "6px",
          textAlign: "center",
          marginTop: "4px",
        }}
      >
        <i
          className="ph-fill ph-lightning"
          style={{ color: "var(--gold)", fontSize: "24px", marginRight: "4px" }}
        ></i>{" "}
        Activating Your Account
      </div>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-sub)",
          lineHeight: "1.6",
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
          <div className="bpc-pct" id="bpcPct">
            0%
          </div>
        </div>
        <div className="bpc-track">
          <div className="bpc-fill" id="bpcFill"></div>
        </div>
        <div className="bpc-msg" id="bpcMsg">
          Preparing your welcome bonus...
        </div>
        <div className="bpc-paused" id="bpcPaused">
          <strong>
            <i className="ph-bold ph-pause"></i> Almost there!
          </strong>{" "}
          Your $20 bonus is loaded — we just need to verify your identity before
          releasing it. One quick step below.
        </div>
      </div>
      <div className="act-list" style={{ marginTop: "16px" }}>
        <div className="act-item" id="ai1">
          <div className="act-iw">
            <i className="ph-fill ph-game-controller"></i>
          </div>
          <div>
            <div className="act-name">Game library access</div>
            <div className="act-desc-s">500+ slots, fish &amp; table games</div>
          </div>
          <div className="act-status" id="as1">
            Pending
          </div>
        </div>
        <div className="act-item" id="ai2">
          <div className="act-iw" style={{ padding: "4px" }}>
            <img
              src="dollar.png"
              alt="Dollar"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div>
            <div className="act-name">Welcome bonus ($20)</div>
            <div className="act-desc-s">No deposit required</div>
          </div>
          <div className="act-status" id="as2">
            Pending
          </div>
        </div>
        <div className="act-item" id="ai3">
          <div className="act-iw">
            <i className="ph-fill ph-trophy"></i>
          </div>
          <div>
            <div className="act-name">VIP rewards program</div>
            <div className="act-desc-s">Earn points on every game</div>
          </div>
          <div className="act-status" id="as3">
            Pending
          </div>
        </div>
        <div className="act-item" id="ai4">
          <div className="act-iw">
            <i className="ph-fill ph-lock-key"></i>
          </div>
          <div>
            <div className="act-name">Identity verification</div>
            <div className="act-desc-s">Required for bonus release</div>
          </div>
          <div className="act-status" id="as4">
            Pending
          </div>
        </div>
      </div>
    </div>
  </div>

  {/*  ⑤ SECURITY  */}
  <div className="screen" id="screen-security">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
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
        <div className="sec-check" id="sc1">
          <div className="scdot">·</div>
          <span>Device security verified</span>
        </div>
        <div className="sec-check" id="sc2">
          <div className="scdot">·</div>
          <span>Location compliance checked</span>
        </div>
        <div className="sec-check" id="sc3">
          <div className="scdot">·</div>
          <span>Account eligibility confirmed</span>
        </div>
        <div className="sec-check" id="sc4">
          <div className="scdot">·</div>
          <span>Identity confirmation required</span>
        </div>
      </div>
      <div className="sec-alert" id="secAlert">
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

  {/*  ⑥ LOCKER  */}
  <div className="screen" id="screen-locker">
    <div className="topbar">
      <a className="brand" href="#">
        <div className="brand-icon">
          <i className="ph-fill ph-slots"></i>
        </div>
        <div className="brand-name">GameVault 777</div>
      </a>
    </div>
    <div className="content" style={{ paddingTop: "12px" }}>
      {/*  Step nodes  */}
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

      {/*  Hero  */}
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
          Complete a quick one-time identity check to activate your account and
          unlock your $20 bonus — required by gaming regulations.
        </p>
      </div>

      {/*  Identity card  */}
      <div className="id-card">
        <div className="id-top">
          <div className="id-avatar">
            <i className="ph-fill ph-user"></i>
          </div>
          <div className="id-info">
            <div className="id-name" id="idName">
              New Player
            </div>
            <div className="id-email" id="idEmail">
              ••••@email.com
            </div>
          </div>
          <div className="id-badge" id="idBadge">
            <i
              className="ph-bold ph-hourglass-high"
              style={{ marginRight: "2px" }}
            ></i>{" "}
            Pending
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
              <i className="ph-bold ph-check"></i>
              Verified
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
              <i className="ph-bold ph-check"></i>
              Secured
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
            <span className="id-cv cv-pend" id="idChkVal">
              <i className="ph-bold ph-hourglass-high"></i> Required
            </span>
          </div>
        </div>
      </div>

      {/*  Methods header  */}
      <div className="methods-hdr">
        <div className="methods-lbl">Verification methods</div>
        <div className="sess-chip">
          <div className="sess-dot"></div>Session:{" "}
          <b
            id="lockTimer"
            style={{
              color: "var(--text)",
              fontVariantNumeric: "tabular-nums",
              marginLeft: "3px",
            }}
          >
            14:59
          </b>
        </div>
      </div>

      {/*  Skeletons  */}
      <div className="skel-wrap" id="skelWrap">
        <div className="mskel"></div>
        <div className="mskel"></div>
      </div>

      {/*  2 offer cards  */}
      <div id="methodList" style={{ display: "none" }}></div>

      {/*  ⛔ BLOCK PANEL — shown when user closes offer tab without completing  */}
      <div className="block-panel" id="blockPanel">
        <div className="block-icon">
          <i className="ph-fill ph-prohibit"></i>
        </div>
        <div className="block-title">Verification Not Completed</div>
        <p className="block-msg">
          You must <strong>fully complete</strong> the verification on the
          partner page before your $20 bonus can be released. Closing the tab
          early does not count.
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
            <span>Our system will automatically detect when you're done</span>
          </div>
          <div className="block-step">
            <div className="block-step-num">3</div>
            <span>
              Your $20 bonus unlocks instantly — no extra steps needed
            </span>
          </div>
        </div>
        <button
          className="reopen-offer-btn"
          id="reopenBtn"
          onClick="reopenMethod()"
        >
          <i className="ph-bold ph-arrow-up-right"></i> &nbsp;Return to
          Verification Page
        </button>
        <div className="block-or">— or —</div>
        <button className="try-other-btn" onClick="tryOtherOffer()">
          Try a Different Verification Method
        </button>
      </div>

      {/*  Pending panel (actively waiting for postback)  */}
      <div className="pend-panel" id="pendPanel">
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
        <div className="pend-title" id="pendTitle">
          Processing Verification...
        </div>
        <p className="pend-sub" id="pendSub">
          Complete the process on the partner page. We check every few seconds —
          no action needed here.
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
          <div className="pck" id="pck3">
            <div className="pck-dot"></div>Identity confirmed
          </div>
        </div>
        <div className="el-track">
          <div className="el-fill" id="elFill"></div>
        </div>
        <div className="el-txt">
          Checking — <b id="elTxt">0s</b> elapsed
        </div>
      </div>

      {/*  Activate button — server-locked until postback  */}
      <div className="act-btn-wrap">
        <button className="act-btn" id="actBtn" disabled>
          <i className="ph-fill ph-lock-key" style={{ marginRight: "4px" }}></i>
          &nbsp;Waiting for verification
        </button>
        <p className="act-hint" id="actHint">
          Activates automatically once your identity is confirmed
        </p>
      </div>

      {/*  Trust  */}
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

      {/*  FAQ  */}
      <div className="faq-wrap">
        <button className="faq-btn" id="faqBtn" onClick="toggleFaq()">
          Why is this required? <span className="faq-arr">▾</span>
        </button>
        <div className="faq-body" id="faqBody">
          <div className="faq-qi">
            <div className="faqq">
              Why must I complete the full verification?
            </div>
            <div className="faqa">
              Gaming regulations require confirmed identity before releasing
              bonuses. Simply clicking an offer and closing the tab does not
              satisfy this requirement — the partner must confirm you completed
              their process.
            </div>
          </div>
          <div className="faq-qi">
            <div className="faqq">How does automatic detection work?</div>
            <div className="faqa">
              Our verification partners send us a secure confirmation the moment
              you finish. Your bonus unlocks automatically — you don't need to
              do anything on this page.
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
      </div>
    </div>
  </div>

  {/*  ⑦ ACTIVATED — success screen with user info, bonus, email confirmation  */}
  <div className="screen" id="screen-activated">
    <div className="confetti-el" id="confettiEl"></div>
    <div className="activated-wrap">
      {/*  Big check  */}
      <div className="act-check-ring">
        <div className="act-check-ring-anim"></div>
        <div className="act-check-circle">
          <i className="ph-bold ph-check"></i>
        </div>
      </div>

      <h1 className="activated-title">
        Account <span className="g">Activated!</span>
      </h1>
      <p className="activated-sub" id="activatedSub">
        Identity confirmed. Your $20 welcome bonus has been credited and is
        ready to use.
      </p>

      {/*  User info card  */}
      <div className="user-info-card">
        <div className="uic-header">
          <div className="uic-avatar">
            <i className="ph-fill ph-slots"></i>
          </div>
          <div>
            <div className="uic-name" id="uicName">
              New Player
            </div>
            <div className="uic-email" id="uicEmail">
              player@email.com
            </div>
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
            <div className="uic-row-val" id="memberSince">
              —
            </div>
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
            <div className="uic-row-val" id="uicRegion">
              United States
            </div>
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

      {/*  Bonus breakdown  */}
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

      {/*  Email sent confirmation  */}
      <div className="email-sent-card">
        <div className="esc-icon">
          <i className="ph-fill ph-envelope-simple"></i>
        </div>
        <div className="esc-info">
          <div className="esc-title">Confirmation Email Sent</div>
          <div className="esc-sub" id="escEmail">
            Your account details have been sent to your email
          </div>
        </div>
        <div className="esc-check">
          <i className="ph-bold ph-check"></i>
        </div>
      </div>

      {/*  Enter vault button  */}
      <button className="enter-btn" onClick="enterVault()">
        <i className="ph-fill ph-slots" style={{ marginRight: "4px" }}></i>
        &nbsp;Enter Game Vault 777
      </button>

      {/*  Auto-redirect progress  */}
      <div className="redir-wrap">
        <div className="redir-track">
          <div className="redir-fill" id="redirFill"></div>
        </div>
        <p className="redir-txt" id="redirTxt">
          Redirecting automatically in <b id="redirCount">10</b>s...
        </p>
      </div>
    </div>
  </div>
</>;
