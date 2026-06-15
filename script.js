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
      setMsg("Skriv inn ei gyldig e-postadresse.", "error");
      input.focus();
      return;
    }

    var subject = encodeURIComponent("Påmelding · utelivsbrevet");
    var body = encodeURIComponent(
      "Hei!\n\nEg vil melde meg på utelivsbrevet.\nE-post: " +
        email +
        "\n\n— sendt frå sumer.forum"
    );

    window.location.href =
      "mailto:" + NEWSLETTER + "?subject=" + subject + "&body=" + body;

    setMsg("Takk! Fullfør påmeldinga i e-postappen din ✦", "success");
    form.reset();
  });

  input.addEventListener("input", function () {
    if (msg.textContent) setMsg("");
  });
})();
