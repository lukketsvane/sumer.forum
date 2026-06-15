/* SUMER — utelivsbrevet signup
   No backend: the form opens the visitor's mail app pre-addressed to the
   newsletter inbox. Swap NEWSLETTER / the submit handler for a real API
   (Mailchimp, Buttondown, Resend, …) when one is available. */
(function () {
  "use strict";

  var NEWSLETTER = "utelivsbrevet@vartoslo.no";

  var form = document.getElementById("signup-form");
  var input = document.getElementById("email");
  var msg = document.getElementById("form-msg");
  if (!form || !input || !msg) return;

  function isValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setMsg(text, state) {
    msg.textContent = text || "";
    msg.className = "signup__msg" + (state ? " is-" + state : "");
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
      "Hi!\n\nI'd like to sign up for utelivsbrevet.\nEmail: " +
        email +
        "\n\n— sent from sumer.forum"
    );

    window.location.href =
      "mailto:" + NEWSLETTER + "?subject=" + subject + "&body=" + body;

    setMsg("Thanks! Finish signing up in your mail app ✦", "success");
    form.reset();
  });

  input.addEventListener("input", function () {
    if (msg.textContent) setMsg("");
  });
})();
