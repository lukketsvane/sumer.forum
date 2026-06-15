/* SUMER — lanseres snart
   - fargevelger (gul · terrakotta · blaa · gronn · natt), lagres lokalt
   - påmelding til utelivsbrevet (mailto-overlevering; bytt til ekte API senere) */
(function () {
  "use strict";

  /* ---------- fargevelger ---------- */
  var THEMES = {
    gul:        "#f6cb16",
    terrakotta: "#7b3523",
    blaa:       "#2438dc",
    gronn:      "#1f5e3a",
    natt:       "#111111"
  };
  var STORE = "sumer-theme";
  var root = document.documentElement;
  var themeMeta = document.getElementById("theme-color");

  function applyTheme(name) {
    if (!THEMES[name]) name = "gul";
    root.setAttribute("data-theme", name);
    if (themeMeta) themeMeta.setAttribute("content", THEMES[name]);
    var btns = document.querySelectorAll(".themes__btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("is-active", btns[i].getAttribute("data-set") === name);
    }
  }

  var saved;
  try { saved = localStorage.getItem(STORE); } catch (e) {}
  applyTheme(saved || root.getAttribute("data-theme") || "gul");

  var themeBtns = document.querySelectorAll(".themes__btn");
  for (var i = 0; i < themeBtns.length; i++) {
    (function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-set");
        applyTheme(name);
        try { localStorage.setItem(STORE, name); } catch (e) {}
      });
    })(themeBtns[i]);
  }

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
