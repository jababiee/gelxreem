// ===== Easy-edit settings for Reem =====
const INSTAGRAM = "gelxreem";            // DM handle used by the booking button

// ===== Wavy frame + bow (matches the Instagram highlight cards) =====
const WAVE = "M6.4 2.7 Q9.7 2.1 13.1 1.8 Q16.4 1.5 19.8 2.1 Q23.1 2.7 26.5 3.4 Q29.9 4.1 33.2 4.4 Q36.6 4.7 39.9 4.2 Q43.3 3.8 46.6 3.3 Q50.0 2.7 53.4 2.1 Q56.7 1.5 60.1 1.6 Q63.4 1.7 66.8 2.0 Q70.1 2.3 73.5 3.1 Q76.9 3.9 80.2 4.4 Q83.6 4.9 86.9 4.8 Q90.3 4.6 93.5 3.8 Q96.7 3.0 97.7 6.4 Q98.7 9.7 98.8 13.1 Q98.9 16.4 98.4 19.8 Q98.0 23.1 97.3 26.5 Q96.6 29.9 95.9 33.2 Q95.1 36.6 95.3 39.9 Q95.6 43.3 96.3 46.6 Q97.1 50.0 97.8 53.4 Q98.5 56.7 98.7 60.1 Q98.9 63.4 98.5 66.8 Q98.1 70.1 97.0 73.5 Q95.9 76.9 95.7 80.2 Q95.5 83.6 95.7 86.9 Q95.9 90.3 96.5 93.6 Q97.0 97.0 93.6 97.5 Q90.3 97.9 86.9 98.2 Q83.6 98.5 80.2 97.9 Q76.9 97.3 73.5 97.0 Q70.1 96.7 66.8 96.3 Q63.4 95.8 60.1 95.8 Q56.7 95.8 53.4 96.3 Q50.0 96.8 46.6 97.7 Q43.3 98.7 39.9 98.6 Q36.6 98.6 33.2 98.4 Q29.9 98.1 26.5 97.4 Q23.1 96.7 19.8 96.1 Q16.4 95.4 13.1 95.6 Q9.7 95.7 6.3 96.3 Q2.9 97.0 2.4 93.6 Q1.8 90.3 1.8 86.9 Q1.8 83.6 2.1 80.2 Q2.5 76.9 2.9 73.5 Q3.4 70.1 4.2 66.8 Q5.0 63.4 4.9 60.1 Q4.7 56.7 3.8 53.4 Q2.9 50.0 2.4 46.6 Q2.0 43.3 1.7 39.9 Q1.4 36.6 1.9 33.2 Q2.3 29.9 3.1 26.5 Q3.9 23.1 4.0 19.8 Q4.1 16.4 4.3 13.1 Q4.6 9.7 3.8 6.5 Q3.0 3.3 6.4 2.7 Z";
const BOW = "M60 26 C46 6 18 4 20 20 C22 34 46 32 60 26 Z M60 26 C74 6 102 4 100 20 C98 34 74 32 60 26 Z M56 28 C50 40 42 50 32 58 M64 28 C70 40 78 50 88 58";
document.querySelectorAll(".frame").forEach(el => {
  el.insertAdjacentHTML("afterbegin",
    '<svg class="wave" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="'+WAVE+'"/></svg>' +
    '<svg class="bow" viewBox="0 0 120 62" aria-hidden="true"><path d="'+BOW+'"/></svg>');
});

// ===== Mobile menu =====
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav ul");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false);
  }));
}

// ===== Sideways gallery arrows =====
document.querySelectorAll(".reel").forEach(reel => {
  const track = reel.querySelector(".track");
  const ctrl = reel.querySelector(".reel-ctrl");
  const fit = () => { ctrl.style.visibility = track.scrollWidth > track.clientWidth + 4 ? "visible" : "hidden"; };
  window.addEventListener("load", fit); window.addEventListener("resize", fit); fit();
  reel.querySelectorAll("[data-dir]").forEach(btn => btn.addEventListener("click", () => {
    track.scrollBy({ left: Number(btn.dataset.dir) * track.clientWidth * 0.8, behavior: "smooth" });
  }));
});

// ===== Booking request =====
const form = document.getElementById("booking");
if (form) {
  const est = document.getElementById("estimate");
  const toast = document.getElementById("toast");

  const val = name => (form.querySelector('[name="'+name+'"]:checked') || {}).value || "";

  function updateEstimate() {
    const len = form.querySelector('[name="length"]:checked');
    let low = 0, high = 0, tbd = false;
    if (len) {
      if (len.dataset.low) { low += +len.dataset.low; high += +len.dataset.high; } else tbd = true;
    }
    form.querySelectorAll('[name="addon"]:checked').forEach(a => { low += +a.dataset.price; high += +a.dataset.price; });
    if (!len && low === 0) est.textContent = "Pick a length";
    else if (tbd) est.textContent = "DM for quote";
    else est.textContent = low === high ? "$" + low : "$" + low + "–$" + high;
  }
  form.addEventListener("change", updateEstimate);
  updateEstimate();

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = form.name.value.trim();
    if (!val("length") || !val("shape") || !name) {
      toast.className = "toast show err";
      toast.textContent = "Add your name, a length, and a shape so Reem can plan your set.";
      return;
    }
    const addons = [...form.querySelectorAll('[name="addon"]:checked')].map(a => a.value);
    const msg = [
      "Hi Reem! I'd like to book a set 💅",
      "Name: " + name,
      "Length: " + val("length"),
      "Shape: " + val("shape"),
      addons.length ? "Add-ons: " + addons.join(", ") : "",
      form.date.value ? "Preferred date: " + form.date.value + (form.time.value ? " (" + form.time.value + ")" : "") : "",
      form.details.value.trim() ? "Design details: " + form.details.value.trim() : "",
      "Estimate from site: " + est.textContent,
      "I've read the policies and understand the $5 deposit."
    ].filter(Boolean).join("\n");

    let copied = false;
    try { await navigator.clipboard.writeText(msg); copied = true; } catch (_) {}
    toast.className = "toast show";
    toast.innerHTML = copied
      ? "Your request is copied. Paste it into the Instagram DM that just opened and attach any inspo pics."
      : "Copy this message and send it to @" + INSTAGRAM + " on Instagram:<br><br>" + msg.replace(/</g,"&lt;").replace(/\n/g,"<br>");
    window.open("https://ig.me/m/" + INSTAGRAM, "_blank", "noopener");
  });
}

document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
