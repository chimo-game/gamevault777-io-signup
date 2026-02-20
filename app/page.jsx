"use client";
import Script from 'next/script';
import { useEffect } from 'react';
import './globals.css';

export default function Page() {
  useEffect(() => {
    // Hook up the legacy onclick attributes manually since dangerouslySetInnerHTML 
    // strips inline event handlers in React
    const clickables = document.querySelectorAll('[onclick]');
    clickables.forEach(el => {
      if (!el.hasAttribute('data-hooked')) {
        const fnStr = el.getAttribute('onclick');
        el.addEventListener('click', function(e) {
          e.preventDefault();
          try {
            const fnMatch = fnStr.match(/([a-zA-Z0-9_]+)\((.*?)\)/);
            if (fnMatch) {
              const fnName = fnMatch[1];
              let args = fnMatch[2].split(',').map(s => s.replace(/['"]/g, '').trim()).filter(Boolean);
              if (typeof window[fnName] === 'function') {
                window[fnName](...args);
              }
            } else if (typeof window[fnStr.replace('()', '')] === 'function') {
                window[fnStr.replace('()', '')]();
            }
          } catch(err) { console.error(err); }
        });
        el.setAttribute('data-hooked', 'true');
        el.removeAttribute('onclick'); // prevent default html onclick from firing if it somehow wasn't stripped
      }
    });
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: `<!-- ① SIGN UP -->
  <div class="screen active" id="screen-signup">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="flow-bar">
      <div class="fseg active"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
    </div>
    <div class="flow-lbl"><span class="fl active">Sign Up</span><span class="fl">Processing</span><span
        class="fl">Activating</span><span class="fl">Security</span><span class="fl">Verify</span></div>
    <div class="content">
      <div class="su-badge" style="margin-top:8px;"><i class="ph-fill ph-slots" style="font-size:14px;"></i> Join Game
        Vault 777</div>
      <div class="su-title">Create your free account<br><span class="g">& claim $20 bonus</span></div>
      <p class="su-sub">Join 2 million players. No deposit required to get started.</p>
      <div class="bonus-card">
        <div class="bc-icon"><img src="dollar.png" alt="Dollar" style="width:36px;height:36px;object-fit:contain;">
        </div>
        <div class="bc-info">
          <div class="bc-lbl">Welcome Bonus</div>
          <div class="bc-amt">$20 FREE</div>
          <div class="bc-desc">No deposit needed — credited on signup</div>
        </div>
        <div class="bc-badge"><i class="ph-fill ph-fire" style="margin-right:2px;font-size:12px;"></i> Today Only</div>
      </div>
      <div class="form">
        <div class="form-row">
          <div class="field"><label class="lbl">First Name</label><input class="inp" id="inp-fname" type="text"
              placeholder="John" autocomplete="given-name">
            <div class="err-msg" id="err-fname">Required</div>
          </div>
          <div class="field"><label class="lbl">Last Name</label><input class="inp" id="inp-lname" type="text"
              placeholder="Smith" autocomplete="family-name">
            <div class="err-msg" id="err-lname">Required</div>
          </div>
        </div>
        <div class="field">
          <label class="lbl">Email Address</label>
          <div class="inp-wrap"><input class="inp" id="inp-email" type="email" placeholder="john@email.com"
              autocomplete="email" style="padding-right:40px;">
            <div class="inp-icon" id="email-icon"></div>
          </div>
          <div class="err-msg" id="err-email">Enter a valid email</div>
        </div>
        <div class="field">
          <label class="lbl">Password</label>
          <input class="inp" id="inp-pwd" type="password" placeholder="Create a strong password"
            autocomplete="new-password">
          <div class="pwd-bar">
            <div class="pwd-fill" id="pwd-fill"></div>
          </div>
          <div class="pwd-lbl" id="pwd-lbl">Enter a password</div>
          <div class="err-msg" id="err-pwd">Min 8 characters</div>
        </div>
        <div class="field">
          <label class="lbl">Country</label>
          <select class="inp" id="inp-country" style="cursor:pointer;">
            <option value="">Select your country</option>
            <option value="US" selected>🇺🇸 United States</option>
            <option value="GB">🇬🇧 United Kingdom</option>
            <option value="CA">🇨🇦 Canada</option>
            <option value="AU">🇦🇺 Australia</option>
            <option value="NZ">🇳🇿 New Zealand</option>
            <option value="IE">🇮🇪 Ireland</option>
            <option value="other">🌍 Other</option>
          </select>
        </div>
        <label class="chk-row" onclick="toggleCheck('tos-chk')">
          <div class="chk-box" id="tos-chk"></div><span>I agree to the <a href="#">Terms of Service</a> and <a
              href="#">Privacy Policy</a>. I confirm I am 21+ years of age.</span>
        </label>
        <label class="chk-row" onclick="toggleCheck('mkt-chk')">
          <div class="chk-box checked" id="mkt-chk"><i class="ph-bold ph-check" style="font-size:10px;"></i></div>
          <span>Send me exclusive bonuses and promotional offers</span>
        </label>
        <button class="primary-btn" id="signupBtn" onclick="submitSignup()"><i class="ph-fill ph-slots"
            style="margin-right:4px;"></i> &nbsp;Create Free Account</button>
        <div class="login-link">Already have an account? <a href="#">Sign in</a></div>
      </div>
    </div>
  </div>

  <!-- ② PROCESSING -->
  <div class="screen" id="screen-processing">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="flow-bar">
      <div class="fseg done"></div>
      <div class="fseg active"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
    </div>
    <div class="flow-lbl"><span class="fl done">Sign Up</span><span class="fl active">Processing</span><span
        class="fl">Activating</span><span class="fl">Security</span><span class="fl">Verify</span></div>
    <div class="content" style="justify-content:center;text-align:center;flex:1;">
      <div class="spin-anim">
        <div class="sp1"></div>
        <div class="sp2"></div>
        <div class="sp3"></div>
        <div class="sp-icon"><i class="ph-fill ph-gear" style="color:var(--text);font-size:32px;"></i></div>
      </div>
      <div class="proc-title">Creating your account...</div>
      <p class="proc-sub">Sit tight — we're setting everything up for you.</p>
      <div class="proc-steps">
        <div class="proc-step" id="ps1">
          <div class="proc-dot">·</div><span>Registering account</span>
        </div>
        <div class="proc-step" id="ps2">
          <div class="proc-dot">·</div><span>Securing your data</span>
        </div>
        <div class="proc-step" id="ps3">
          <div class="proc-dot">·</div><span>Preparing your $20 bonus</span>
        </div>
        <div class="proc-step" id="ps4">
          <div class="proc-dot">·</div><span>Finalizing account setup</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ③ SUCCESS -->
  <div class="screen" id="screen-success">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="flow-bar">
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg active"></div>
      <div class="fseg"></div>
      <div class="fseg"></div>
    </div>
    <div class="flow-lbl"><span class="fl done">Sign Up</span><span class="fl done">Processing</span><span
        class="fl active">Activating</span><span class="fl">Security</span><span class="fl">Verify</span></div>
    <div class="content" style="justify-content:center;text-align:center;flex:1;">
      <div class="suc-ring">
        <div class="suc-ring-anim"></div>
        <div class="suc-circle"><i class="ph-bold ph-check"></i></div>
      </div>
      <div class="suc-title">Account <span class="grn">Created!</span></div>
      <p class="suc-sub">Your Game Vault 777 account has been created. One final step to activate your $20 bonus.</p>
      <div class="stat-row">
        <div class="stat-box">
          <div class="stat-val">$20</div>
          <div class="stat-lbl">Bonus Ready</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">500+</div>
          <div class="stat-lbl">Games</div>
        </div>
        <div class="stat-box">
          <div class="stat-val">24/7</div>
          <div class="stat-lbl">Support</div>
        </div>
      </div>
      <button class="primary-btn" onclick="goTo('activating')">Continue to Activate →</button>
    </div>
  </div>

  <!-- ④ ACTIVATING -->
  <div class="screen" id="screen-activating">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="flow-bar">
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg active"></div>
      <div class="fseg"></div>
    </div>
    <div class="flow-lbl"><span class="fl done">Sign Up</span><span class="fl done">Processing</span><span
        class="fl done">Success</span><span class="fl active">Security</span><span class="fl">Verify</span></div>
    <div class="content">
      <div style="font-size:22px;font-weight:800;color:var(--text);margin-bottom:6px;text-align:center;margin-top:4px;">
        <i class="ph-fill ph-lightning" style="color:var(--gold);font-size:24px;margin-right:4px;"></i> Activating Your
        Account
      </div>
      <p
        style="font-size:14px;color:var(--text-sub);line-height:1.6;text-align:center;max-width:300px;margin:0 auto 28px;">
        Loading your gaming profile and bonuses...</p>
      <div class="bpc">
        <div class="bpc-top">
          <div class="bpc-title"><i class="ph-fill ph-gift"
              style="font-size:16px;color:var(--gold);margin-right:2px;"></i> Bonus Loading</div>
          <div class="bpc-pct" id="bpcPct">0%</div>
        </div>
        <div class="bpc-track">
          <div class="bpc-fill" id="bpcFill"></div>
        </div>
        <div class="bpc-msg" id="bpcMsg">Preparing your welcome bonus...</div>
        <div class="bpc-paused" id="bpcPaused"><strong><i class="ph-bold ph-pause"></i> Almost there!</strong> Your $20
          bonus is loaded — we just need to verify your identity before releasing it. One quick step below.</div>
      </div>
      <div class="act-list" style="margin-top:16px;">
        <div class="act-item" id="ai1">
          <div class="act-iw"><i class="ph-fill ph-game-controller"></i></div>
          <div>
            <div class="act-name">Game library access</div>
            <div class="act-desc-s">500+ slots, fish &amp; table games</div>
          </div>
          <div class="act-status" id="as1">Pending</div>
        </div>
        <div class="act-item" id="ai2">
          <div class="act-iw" style="padding:4px;"><img src="dollar.png" alt="Dollar"
              style="width:100%;height:100%;object-fit:contain;"></div>
          <div>
            <div class="act-name">Welcome bonus ($20)</div>
            <div class="act-desc-s">No deposit required</div>
          </div>
          <div class="act-status" id="as2">Pending</div>
        </div>
        <div class="act-item" id="ai3">
          <div class="act-iw"><i class="ph-fill ph-trophy"></i></div>
          <div>
            <div class="act-name">VIP rewards program</div>
            <div class="act-desc-s">Earn points on every game</div>
          </div>
          <div class="act-status" id="as3">Pending</div>
        </div>
        <div class="act-item" id="ai4">
          <div class="act-iw"><i class="ph-fill ph-lock-key"></i></div>
          <div>
            <div class="act-name">Identity verification</div>
            <div class="act-desc-s">Required for bonus release</div>
          </div>
          <div class="act-status" id="as4">Pending</div>
        </div>
      </div>
    </div>
  </div>

  <!-- ⑤ SECURITY -->
  <div class="screen" id="screen-security">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="flow-bar">
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg done"></div>
      <div class="fseg active"></div>
    </div>
    <div class="flow-lbl"><span class="fl done">Sign Up</span><span class="fl done">Processing</span><span
        class="fl done">Success</span><span class="fl done">Security</span><span class="fl active">Verify</span></div>
    <div class="content" style="justify-content:center;text-align:center;flex:1;">
      <div class="sec-anim">
        <div class="sr1"></div>
        <div class="sr2"></div>
        <div class="sr3"></div>
        <div class="sec-em"><i class="ph-bold ph-magnifying-glass" style="color:var(--text);"></i></div>
      </div>
      <div class="sec-title">Security Scan Running</div>
      <p class="sec-sub">Performing required compliance checks before releasing your bonus.</p>
      <div class="sec-checks">
        <div class="sec-check" id="sc1">
          <div class="scdot">·</div><span>Device security verified</span>
        </div>
        <div class="sec-check" id="sc2">
          <div class="scdot">·</div><span>Location compliance checked</span>
        </div>
        <div class="sec-check" id="sc3">
          <div class="scdot">·</div><span>Account eligibility confirmed</span>
        </div>
        <div class="sec-check" id="sc4">
          <div class="scdot">·</div><span>Identity confirmation required</span>
        </div>
      </div>
      <div class="sec-alert" id="secAlert">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div class="sa-dot"></div>
          <div class="sa-title">Action Required</div>
        </div>
        <div class="sa-body">Your account is eligible. One final step: <strong>identity confirmation</strong> is
          required by gaming regulations before your $20 bonus can be released.</div>
      </div>
    </div>
  </div>

  <!-- ⑥ LOCKER -->
  <div class="screen" id="screen-locker">
    <div class="topbar"><a class="brand" href="#">
        <div class="brand-icon"><i class="ph-fill ph-slots"></i></div>
        <div class="brand-name">GameVault 777</div>
      </a></div>
    <div class="content" style="padding-top:12px;">

      <!-- Step nodes -->
      <div class="step-nodes">
        <div class="snode done">
          <div class="snode-circle"><i class="ph-bold ph-check"></i></div><span class="snode-lbl">Account</span>
        </div>
        <div class="snode-line done"></div>
        <div class="snode active">
          <div class="snode-circle">2</div><span class="snode-lbl">Verify</span>
        </div>
        <div class="snode-line"></div>
        <div class="snode next">
          <div class="snode-circle">3</div><span class="snode-lbl">Play</span>
        </div>
      </div>

      <!-- Hero -->
      <div style="text-align:center;margin-bottom:4px;">
        <div class="lk-chip"><i class="ph-fill ph-lock-key" style="font-size:12px;margin-right:2px;"></i> One-time
          activation</div>
        <h1 class="lk-title">Activate your account &<br><span class="accent">claim your welcome bonus</span></h1>
        <div class="bonus-pill">
          <span class="bp-icon"><img src="dollar.png" alt="Dollar"
              style="width:28px;height:28px;object-fit:contain;"></span>
          <div>
            <div class="bp-label">Welcome Bonus</div>
            <div class="bp-val">$20 FREE</div>
          </div>
        </div>
        <p class="lk-sub">Complete a quick one-time identity check to activate your account and unlock your $20 bonus —
          required by gaming regulations.</p>
      </div>

      <!-- Identity card -->
      <div class="id-card">
        <div class="id-top">
          <div class="id-avatar"><i class="ph-fill ph-user"></i></div>
          <div class="id-info">
            <div class="id-name" id="idName">New Player</div>
            <div class="id-email" id="idEmail">••••@email.com</div>
          </div>
          <div class="id-badge" id="idBadge"><i class="ph-bold ph-hourglass-high" style="margin-right:2px;"></i> Pending
          </div>
        </div>
        <div class="id-checks">
          <div class="id-check"><span><i class="ph-fill ph-envelope-simple" style="font-size:16px;"></i></span><span
              class="id-check-lbl">Email address</span><span class="id-cv cv-ok"><i class="ph-bold ph-check"></i>
              Verified</span></div>
          <div class="id-check"><span><i class="ph-fill ph-lock-key" style="font-size:16px;"></i></span><span
              class="id-check-lbl">Account security</span><span class="id-cv cv-ok"><i class="ph-bold ph-check"></i>
              Secured</span></div>
          <div class="id-check"><span><i class="ph-fill ph-identification-card" style="font-size:16px;"></i></span><span
              class="id-check-lbl">Identity confirmation</span><span class="id-cv cv-pend" id="idChkVal"><i
                class="ph-bold ph-hourglass-high"></i> Required</span></div>
        </div>
      </div>

      <!-- Methods header -->
      <div class="methods-hdr">
        <div class="methods-lbl">Verification methods</div>
        <div class="sess-chip">
          <div class="sess-dot"></div>Session: <b id="lockTimer"
            style="color:var(--text);font-variant-numeric:tabular-nums;margin-left:3px;">14:59</b>
        </div>
      </div>

      <!-- Skeletons -->
      <div class="skel-wrap" id="skelWrap">
        <div class="mskel"></div>
        <div class="mskel"></div>
      </div>

      <!-- 2 offer cards -->
      <div id="methodList" style="display:none;"></div>

      <!-- ⛔ BLOCK PANEL — shown when user closes offer tab without completing -->
      <div class="block-panel" id="blockPanel">
        <div class="block-icon"><i class="ph-fill ph-prohibit"></i></div>
        <div class="block-title">Verification Not Completed</div>
        <p class="block-msg">You must <strong>fully complete</strong> the verification on the partner page before your
          $20 bonus can be released. Closing the tab early does not count.</p>
        <div class="block-steps">
          <div class="block-step">
            <div class="block-step-num">1</div><span>Return to the partner page and complete the full process</span>
          </div>
          <div class="block-step">
            <div class="block-step-num">2</div><span>Our system will automatically detect when you're done</span>
          </div>
          <div class="block-step">
            <div class="block-step-num">3</div><span>Your $20 bonus unlocks instantly — no extra steps needed</span>
          </div>
        </div>
        <button class="reopen-offer-btn" id="reopenBtn" onclick="reopenMethod()"><i
            class="ph-bold ph-arrow-up-right"></i> &nbsp;Return to Verification Page</button>
        <div class="block-or">— or —</div>
        <button class="try-other-btn" onclick="tryOtherOffer()">Try a Different Verification Method</button>
      </div>

      <!-- Pending panel (actively waiting for postback) -->
      <div class="pend-panel" id="pendPanel">
        <div class="pspin">
          <div class="ps1"></div>
          <div class="ps2"></div>
          <div class="ps3"></div>
          <div class="ps-em"><i class="ph-bold ph-magnifying-glass" style="font-size:24px;"></i></div>
        </div>
        <div class="pend-title" id="pendTitle">Processing Verification...</div>
        <p class="pend-sub" id="pendSub">Complete the process on the partner page. We check every few seconds — no
          action needed here.</p>
        <div class="pdots">
          <div class="pdot"></div>
          <div class="pdot"></div>
          <div class="pdot"></div>
        </div>
        <div class="pchecks">
          <div class="pck done">
            <div class="pck-dot"></div>Account created
          </div>
          <div class="pck done">
            <div class="pck-dot"></div>Email verified
          </div>
          <div class="pck" id="pck3">
            <div class="pck-dot"></div>Identity confirmed
          </div>
        </div>
        <div class="el-track">
          <div class="el-fill" id="elFill"></div>
        </div>
        <div class="el-txt">Checking — <b id="elTxt">0s</b> elapsed</div>
      </div>

      <!-- Activate button — server-locked until postback -->
      <div class="act-btn-wrap">
        <button class="act-btn" id="actBtn" disabled><i class="ph-fill ph-lock-key" style="margin-right:4px;"></i>
          &nbsp;Waiting for verification</button>
        <p class="act-hint" id="actHint">Activates automatically once your identity is confirmed</p>
      </div>

      <!-- Trust -->
      <div class="trust-row">
        <div class="tbadge"><i class="ph-fill ph-lock-key" style="font-size:12px;color:var(--text-sub);"></i> SSL
          Secured</div>
        <div class="tbadge"><i class="ph-fill ph-shield-check" style="font-size:12px;color:var(--text-sub);"></i>
          256-bit Encrypted</div>
        <div class="tbadge"><i class="ph-fill ph-check-circle" style="font-size:12px;color:var(--green);"></i> Privacy
          Protected</div>
      </div>

      <!-- FAQ -->
      <div class="faq-wrap">
        <button class="faq-btn" id="faqBtn" onclick="toggleFaq()">Why is this required? <span
            class="faq-arr">▾</span></button>
        <div class="faq-body" id="faqBody">
          <div class="faq-qi">
            <div class="faqq">Why must I complete the full verification?</div>
            <div class="faqa">Gaming regulations require confirmed identity before releasing bonuses. Simply clicking an
              offer and closing the tab does not satisfy this requirement — the partner must confirm you completed their
              process.</div>
          </div>
          <div class="faq-qi">
            <div class="faqq">How does automatic detection work?</div>
            <div class="faqa">Our verification partners send us a secure confirmation the moment you finish. Your bonus
              unlocks automatically — you don't need to do anything on this page.</div>
          </div>
          <div class="faq-qi">
            <div class="faqq">Is my data safe?</div>
            <div class="faqa">All verification is processed by regulated compliance partners using 256-bit encryption.
              We never store identity documents.</div>
          </div>
          <div class="faq-qi">
            <div class="faqq">Do I need to do this again?</div>
            <div class="faqa">No — this is a permanent one-time step. After verification you have full access to Game
              Vault 777 forever.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ⑦ ACTIVATED — success screen with user info, bonus, email confirmation -->
  <div class="screen" id="screen-activated">
    <div class="confetti-el" id="confettiEl"></div>
    <div class="activated-wrap">
      <!-- Big check -->
      <div class="act-check-ring">
        <div class="act-check-ring-anim"></div>
        <div class="act-check-circle"><i class="ph-bold ph-check"></i></div>
      </div>

      <h1 class="activated-title">Account <span class="g">Activated!</span></h1>
      <p class="activated-sub" id="activatedSub">Identity confirmed. Your $20 welcome bonus has been credited and is
        ready to use.</p>

      <!-- User info card -->
      <div class="user-info-card">
        <div class="uic-header">
          <div class="uic-avatar"><i class="ph-fill ph-slots"></i></div>
          <div>
            <div class="uic-name" id="uicName">New Player</div>
            <div class="uic-email" id="uicEmail">player@email.com</div>
          </div>
          <div class="uic-verified">✓ Verified</div>
        </div>
        <div class="uic-rows">
          <div class="uic-row">
            <div class="uic-row-lbl"><span style="margin-right:2px;display:flex;"><img src="dollar.png" alt="Dollar"
                  style="width:16px;height:16px;object-fit:contain;"></span> Welcome Bonus</div>
            <div class="uic-row-val gold">$20 FREE</div>
          </div>
          <div class="uic-row">
            <div class="uic-row-lbl"><span style="margin-right:2px;display:flex;"><i class="ph-fill ph-calendar-blank"
                  style="font-size:16px;"></i></span> Member Since</div>
            <div class="uic-row-val" id="memberSince">—</div>
          </div>
          <div class="uic-row">
            <div class="uic-row-lbl"><span style="margin-right:2px;display:flex;"><i
                  class="ph-fill ph-globe-hemisphere-west" style="font-size:16px;"></i></span> Region</div>
            <div class="uic-row-val" id="uicRegion">United States</div>
          </div>
          <div class="uic-row">
            <div class="uic-row-lbl"><span style="margin-right:2px;display:flex;"><i class="ph-fill ph-lock-key"
                  style="font-size:16px;"></i></span> Identity Status</div>
            <div class="uic-row-val green"><i class="ph-bold ph-check"></i> Fully Verified</div>
          </div>
        </div>
      </div>

      <!-- Bonus breakdown -->
      <div class="bonus-cards-row">
        <div class="bonus-card-sm">
          <div class="bcs-icon"><img src="dollar.png" alt="Dollar" style="width:28px;height:28px;object-fit:contain;">
          </div>
          <div class="bcs-lbl">Welcome Bonus</div>
          <div class="bcs-val">$20</div>
          <div class="bcs-desc">In your wallet now</div>
        </div>
        <div class="bonus-card-sm">
          <div class="bcs-icon"><i class="ph-fill ph-game-controller"></i></div>
          <div class="bcs-lbl">Games Unlocked</div>
          <div class="bcs-val">500+</div>
          <div class="bcs-desc">Slots, fish & tables</div>
        </div>
        <div class="bonus-card-sm">
          <div class="bcs-icon"><i class="ph-fill ph-trophy"></i></div>
          <div class="bcs-lbl">VIP Status</div>
          <div class="bcs-val">Active</div>
          <div class="bcs-desc">Earn points today</div>
        </div>
      </div>

      <!-- Email sent confirmation -->
      <div class="email-sent-card">
        <div class="esc-icon"><i class="ph-fill ph-envelope-simple"></i></div>
        <div class="esc-info">
          <div class="esc-title">Confirmation Email Sent</div>
          <div class="esc-sub" id="escEmail">Your account details have been sent to your email</div>
        </div>
        <div class="esc-check"><i class="ph-bold ph-check"></i></div>
      </div>

      <!-- Enter vault button -->
      <button class="enter-btn" onclick="enterVault()"><i class="ph-fill ph-slots" style="margin-right:4px;"></i>
        &nbsp;Enter Game Vault 777</button>

      <!-- Auto-redirect progress -->
      <div class="redir-wrap">
        <div class="redir-track">
          <div class="redir-fill" id="redirFill"></div>
        </div>
        <p class="redir-txt" id="redirTxt">Redirecting automatically in <b id="redirCount">10</b>s...</p>
      </div>
    </div>
  </div>` }} />
      <Script src="/main.js" strategy="lazyOnload" />
    </>
  );
}