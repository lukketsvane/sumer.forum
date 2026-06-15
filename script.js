/* SUMER — launching-soon page
   - i18n: EN / NO, with /en /no routes + smart auto-detect (browser language)
   - live countdown to launch
   - utelivsbrevet signup (mailto handoff; swap for a real API later) */
(function () {
  "use strict";

  /* ---------- strings ---------- */
  var STRINGS = {
    en: {
      "html": "en",
      "title": "SUMER · Launching soon",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "aria.ig": "SUMER on Instagram",
      "hero.title": "Nightlife. Culture.<br>Music. Conversation.",
      "hero.lede": "We build spaces for connection and expression across West Asia and North Africa and beyond.",
      "count.label": "Launching soon",
      "count.days": "Days",
      "count.hours": "Hours",
      "count.mins": "Minutes",
      "count.secs": "Seconds",
      "join.title": "Join the movement.",
      "join.sub": "Culture. Events. New projects.",
      "join.ph": "Your email",
      "join.btn": "Get notified",
      "a11y.email": "Email address",
      "msg.invalid": "Please enter a valid email address.",
      "msg.success": "Thanks! Finish signing up in your mail app ✦",
      "mail.subject": "Påmelding · utelivsbrevet",
      "mail.body": "Hi!\n\nI'd like to sign up for utelivsbrevet.\nEmail: {email}\n\n— sent from sumer.forum"
    },
    no: {
      "html": "nb",
      "title": "SUMER · Lanseres snart",
      "nav.about": "Om",
      "nav.projects": "Prosjekter",
      "nav.contact": "Kontakt",
      "aria.ig": "SUMER på Instagram",
      "hero.title": "Uteliv. Kultur.<br>Musikk. Samtale.",
      "hero.lede": "Vi bygger rom for fellesskap og uttrykk på tvers av Vest-Asia og Nord-Afrika – og videre.",
      "count.label": "Lanseres snart",
      "count.days": "Dager",
      "count.hours": "Timer",
      "count.mins": "Minutter",
      "count.secs": "Sekunder",
      "join.title": "Bli med i bevegelsen.",
      "join.sub": "Kultur. Arrangementer. Nye prosjekter.",
      "join.ph": "E-posten din",
      "join.btn": "Få beskjed",
      "a11y.email": "E-postadresse",
      "msg.invalid": "Skriv inn en gyldig e-postadresse.",
      "msg.success": "Takk! Fullfør påmeldingen i e-postappen din ✦",
      "mail.subject": "Påmelding · utelivsbrevet",
      "mail.body": "Hei!\n\nJeg vil melde meg på utelivsbrevet.\nE-post: {email}\n\n— sendt fra sumer.forum"
    }
  };

  var STORE = "sumer-lang";
  var currentLang = "en";

  function pick(lang) { return STRINGS[lang] ? lang : "en"; }

  /* ---------- detect: /en /no  >  ?lang=  >  #hash  >  saved  >  browser ---------- */
  function detectLang() {
    var path = location.pathname.toLowerCase().replace(/\/+$/, "");
    if (/\/no$/.test(path)) return "no";
    if (/\/en$/.test(path)) return "en";

    var q = (new URLSearchParams(location.search).get("lang") || "").toLowerCase();
    if (q === "no" || q === "en") return q;

    var h = location.hash.replace("#", "").toLowerCase();
    if (h === "no" || h === "en") return h;

    try { var saved = localStorage.getItem(STORE); if (saved) return pick(saved); } catch (e) {}

    var langs = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      var l = (langs[i] || "").toLowerCase();
      if (l.indexOf("nb") === 0 || l.indexOf("nn") === 0 || l.indexOf("no") === 0) return "no";
      if (l.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  /* ---------- apply ---------- */
  function applyLang(lang) {
    lang = pick(lang);
    var d = STRINGS[lang];
    currentLang = lang;
    document.documentElement.lang = d["html"];
    document.title = d["title"];

    each("[data-i18n]", function (el) {
      var v = d[el.getAttribute("data-i18n")]; if (v != null) el.textContent = v;
    });
    each("[data-i18n-html]", function (el) {
      var v = d[el.getAttribute("data-i18n-html")]; if (v != null) el.innerHTML = v;
    });
    each("[data-i18n-ph]", function (el) {
      var v = d[el.getAttribute("data-i18n-ph")]; if (v != null) el.setAttribute("placeholder", v);
    });
    each("[data-i18n-aria]", function (el) {
      var v = d[el.getAttribute("data-i18n-aria")]; if (v != null) el.setAttribute("aria-label", v);
    });
    each(".lang__btn", function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function setLang(lang) {
    applyLang(lang);
    try { localStorage.setItem(STORE, currentLang); } catch (e) {}
    try { history.replaceState(null, "", "/" + currentLang); } catch (e) {}
  }

  function each(sel, fn) {
    var n = document.querySelectorAll(sel);
    for (var i = 0; i < n.length; i++) fn(n[i]);
  }

  applyLang(detectLang());
  each(".lang__btn", function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
  });

  /* ---------- countdown (1 September 2026, 00:00 Oslo / CEST +02:00) ---------- */
  var LAUNCH_DATE = new Date("2026-09-01T00:00:00+02:00");
  var cd = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs")
  };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    if (!cd.days) return;
    var diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
    var s = Math.floor(diff / 1000);
    cd.days.textContent = pad(Math.floor(s / 86400));
    cd.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    cd.mins.textContent = pad(Math.floor((s % 3600) / 60));
    cd.secs.textContent = pad(s % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- newsletter signup ---------- */
  var NEWSLETTER = "utelivsbrevet@vartoslo.no";
  var form = document.getElementById("signup-form");
  var input = document.getElementById("email");
  var msg = document.getElementById("form-msg");
  if (!form || !input || !msg) return;

  function isValid(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
  function setMsg(text, state) {
    msg.textContent = text || "";
    msg.className = "join__msg" + (state ? " is-" + state : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = STRINGS[currentLang];
    var email = input.value.trim();
    if (!isValid(email)) { setMsg(d["msg.invalid"], "error"); input.focus(); return; }

    var subject = encodeURIComponent(d["mail.subject"]);
    var body = encodeURIComponent(d["mail.body"].replace("{email}", email));
    window.location.href = "mailto:" + NEWSLETTER + "?subject=" + subject + "&body=" + body;
    setMsg(d["msg.success"], "success");
    form.reset();
  });

  input.addEventListener("input", function () { if (msg.textContent) setMsg(""); });
})();
