/* ====== EDIT HERE ====== */
const EMAIL = "dolapodigital9@gmail.com";

(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = t => isFinite(t) ? Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0") : "0:00";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* nav */
  const mb = $(".menu-btn"), menu = $("#menu");
  const closeMenu = () => { menu.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); mb.setAttribute("aria-label", "Open menu"); };
  mb.addEventListener("click", () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); mb.setAttribute("aria-label", o ? "Close menu" : "Open menu"); });
  $$("#menu a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => e.key === "Escape" && closeMenu());
  $("#yr").textContent = new Date().getFullYear();

  /* animated hero name (letters) + hero equalizer */
  const nm = $("#name"), txt = nm.textContent; nm.textContent = "";
  [...txt].forEach((c, i) => { const s = document.createElement("span"); s.className = "ch"; s.textContent = c === " " ? "\u00a0" : c; s.style.animationDelay = .25 + i * .06 + "s"; nm.appendChild(s); });
  const hw = $(".hero-wave");
  for (let i = 0; i < 48; i++) { const b = document.createElement("i"); b.style.animationDelay = (i % 12) * .09 + "s"; b.style.animationDuration = .8 + (i % 7) * .12 + "s"; hw.appendChild(b); }

  /* scroll reveal */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  $$(".reveal,.tl").forEach((el, i) => { if (io) { el.style.transitionDelay = (i % 4) * .08 + "s"; io.observe(el); } else el.classList.add("in"); });

  /* hero: floating gold dust + gentle parallax */
  const hv = $(".hero-vid"), cv = $("#dust"), hero = $("#home");
  if (calm) { hv.pause(); }
  else {
    const x = cv.getContext("2d"); let W, H, P = [];
    const size = () => { W = cv.width = hero.clientWidth; H = cv.height = hero.clientHeight; P = Array.from({ length: Math.min(60, W / 18 | 0) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, v: Math.random() * .35 + .1, a: Math.random() * .5 + .2 })); };
    size(); addEventListener("resize", size);
    let vis = true; new IntersectionObserver(e => vis = e[0].isIntersecting).observe(hero);
    (function tick() { if (vis) { x.clearRect(0, 0, W, H); P.forEach(p => { p.y -= p.v; p.x += Math.sin(p.y / 40) * .2; if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; } x.fillStyle = "rgba(224,197,142," + p.a + ")"; x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fill(); }); } requestAnimationFrame(tick); })();
    addEventListener("scroll", () => { const y = scrollY; if (y < innerHeight) hv.style.transform = "translateY(" + y * .18 + "px)"; }, { passive: true });
  }

  /* audio players: waveform visualizer, one plays at a time */
  const players = $$(".player"), vids = $$(".vid video");
  players.forEach(p => {
    const a = $("audio", p), btn = $(".play", p), time = $(".time", p), status = $(".status", p), wave = $(".wave", p);
    const n = p.classList.contains("intro") ? 56 : 36, bars = [];
    a.src = p.dataset.src;
    for (let i = 0; i < n; i++) { const s = document.createElement("span"); s.style.height = (22 + Math.abs(Math.sin(i * 1.7) * 55 + Math.sin(i * .5) * 20)) + "%"; s.style.animationDelay = (i % 9) * .08 + "s"; wave.appendChild(s); bars.push(s); }
    const progress = () => {
      const r = a.duration ? a.currentTime / a.duration : 0;
      bars.forEach((b, i) => b.classList.toggle("on", i / n < r));
      wave.setAttribute("aria-valuenow", Math.round(r * 100));
      time.textContent = fmt(a.currentTime) + " / " + fmt(a.duration);
    };
    btn.addEventListener("click", () => {
      if (a.paused) { players.forEach(o => { if (o !== p) $("audio", o).pause(); }); vids.forEach(v => v.pause()); a.play().catch(() => {}); } else a.pause();
    });
    a.addEventListener("play", () => { p.classList.add("playing"); btn.setAttribute("aria-label", "Pause"); status.textContent = ""; });
    ["pause", "ended"].forEach(ev => a.addEventListener(ev, () => { p.classList.remove("playing"); btn.setAttribute("aria-label", "Play"); }));
    a.addEventListener("loadedmetadata", progress); a.addEventListener("timeupdate", progress);
    a.addEventListener("error", () => { p.classList.add("missing"); p.classList.remove("playing"); status.textContent = "Audio file missing"; });
    wave.addEventListener("click", e => { const r = wave.getBoundingClientRect(); if (a.duration) a.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * a.duration; });
    a.preload = "metadata"; // loads durations without downloading everything
  });
  vids.forEach(v => v.addEventListener("play", () => { players.forEach(o => $("audio", o).pause()); vids.forEach(o => o !== v && o.pause()); hv.pause(); }));

  /* contact form: only reports success when the service really accepts it */
  const form = $("#form"), msg = $(".formmsg", form);
  form.addEventListener("submit", async e => {
    e.preventDefault(); msg.className = "formmsg";
    if (!form.checkValidity()) { msg.classList.add("err"); msg.textContent = "Please complete all fields with a valid email."; return; }
    if (form.action.includes("YOUR_FORM_ID")) { msg.classList.add("err"); msg.textContent = "This form isn't connected yet. Please email " + EMAIL + " directly."; return; }
    msg.textContent = "Sending…";
    try {
      const r = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!r.ok) throw 0;
      form.reset(); msg.classList.add("ok"); msg.textContent = "Thank you. Your inquiry was sent and I'll reply soon.";
    } catch { msg.classList.add("err"); msg.textContent = "Something went wrong. Please email " + EMAIL + " instead."; }
  });
})();
