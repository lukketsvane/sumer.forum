/* SUMER — lanseres snart
   - live nedtelling til lansering
   - skjult funksjon: trykk på nedtellingstallene for å bla gjennom fargene
   - påmelding til utelivsbrevet (mailto-overlevering; bytt til ekte API senere) */
(function () {
  "use strict";

  /* ---------- skjult fargebytte (trykk på tallene) ---------- */
  var THEMES = {
    blaa:       "#2438dc",
    gul:        "#f6cb16",
    terrakotta: "#7b3523",
    gronn:      "#1f5e3a",
    natt:       "#111111"
  };
  var ORDER = ["blaa", "gul", "terrakotta", "gronn", "natt"];
  var STORE = "sumer-theme";
  var root = document.documentElement;
  var themeMeta = document.getElementById("theme-color");

  function applyTheme(name) {
    if (!THEMES[name]) name = "blaa";
    root.setAttribute("data-theme", name);
    if (themeMeta) themeMeta.setAttribute("content", THEMES[name]);
  }
  function nextTheme() {
    var cur = root.getAttribute("data-theme") || "blaa";
    var name = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    applyTheme(name);
    try { localStorage.setItem(STORE, name); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  applyTheme(saved || root.getAttribute("data-theme") || "blaa");

  var cells = document.querySelectorAll(".count__cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", nextTheme);
  }

  /* ---------- nedtelling (1. september 2026, 00:00 Oslo / CEST +02:00) ---------- */
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

  /* ---------- påmelding ---------- */
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
    var email = input.value.trim();
    if (!isValid(email)) { setMsg("Skriv inn en gyldig e-postadresse.", "error"); input.focus(); return; }

    var subject = encodeURIComponent("Påmelding · utelivsbrevet");
    var body = encodeURIComponent("Hei!\n\nJeg vil melde meg på utelivsbrevet.\nE-post: " + email + "\n\n— sendt fra sumer.forum");
    window.location.href = "mailto:" + NEWSLETTER + "?subject=" + subject + "&body=" + body;
    setMsg("Takk! Fullfør påmeldingen i e-postappen din.", "success");
    form.reset();
  });

  input.addEventListener("input", function () { if (msg.textContent) setMsg(""); });
})();
