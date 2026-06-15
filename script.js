/* SUMER — launching-soon page
   1) Live countdown to launch.
   2) utelivsbrevet signup (no backend: opens the visitor's mail app
      pre-addressed to the newsletter inbox — swap for a real API later). */
(function () {
  "use strict";

  /* ---------- countdown ---------- */
  // Launch target: 1 September 2026, 00:00 Oslo time (CEST, +02:00).
  var LAUNCH_DATE = new Date("2026-09-01T00:00:00+02:00");

  var els = {
    days: document.getElementById("cd-days"),
    hours: document.getElementById("cd-hours"),
    mins: document.getElementById("cd-mins"),
    secs: document.getElementById("cd-secs"),
  };

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function tick() {
    if (!els.days) return;
    var diff = LAUNCH_DATE.getTime() - Date.now();
    if (diff < 0) diff = 0;
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    var h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60);
    var sec = s % 60;
    els.days.textContent = pad(d);
    els.hours.textContent = pad(h);
    els.mins.textContent = pad(m);
    els.secs.textContent = pad(sec);
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
    var email = input.value.trim();
    if (!isValid(email)) {
      setMsg("Please enter a valid email address.", "error");
      input.focus();
      return;
    }
    var subject = encodeURIComponent("Påmelding · utelivsbrevet");
    var body = encodeURIComponent(
      "Hi!\n\nI'd like to sign up for utelivsbrevet.\nEmail: " + email +
      "\n\n— sent from sumer.forum"
    );
    window.location.href = "mailto:" + NEWSLETTER + "?subject=" + subject + "&body=" + body;
    setMsg("Thanks! Finish signing up in your mail app ✦", "success");
    form.reset();
  });

  input.addEventListener("input", function () { if (msg.textContent) setMsg(""); });
})();
