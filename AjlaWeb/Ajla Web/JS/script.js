
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  });


  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}


const revealEls = document.querySelectorAll(".reveal");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => io.observe(el));


const navLinks = document.querySelectorAll(".nav .nav-link, .mobile-menu .nav-link");
const sections = ["home", "work", "about", "contact"].map((id) => document.getElementById(id));

const sectionIO = new IntersectionObserver(
  (entries) => {
    
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const activeId = visible.target.id;

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const shouldBeActive = href === `#${activeId}`;
      link.classList.toggle("active", shouldBeActive);
    });
  },
  { threshold: [0.35, 0.55, 0.75] }
);

sections.forEach((s) => s && sectionIO.observe(s));


const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setError(fieldName, message) {
  const err = document.querySelector(`.error[data-for="${fieldName}"]`);
  if (err) err.textContent = message || "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let ok = true;

    setError("name", "");
    setError("email", "");
    setError("message", "");
    if (statusEl) statusEl.textContent = "";

    if (name.length < 2) {
      setError("name", "Please enter at least 2 characters.");
      ok = false;
    }

    if (!isValidEmail(email)) {
      setError("email", "Please enter a valid email address.");
      ok = false;
    }

    if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      ok = false;
    }

    if (!ok) return;

    
    if (statusEl) statusEl.textContent = "✅ Message sent! (Demo — connect a backend later to really send emails.)";
    form.reset();
  });
}


const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();