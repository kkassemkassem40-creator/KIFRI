/* Portfolio interactions: theme, mobile menu, reveal, filters and contact form. */
(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Loading screen
  const loader = $("#loader");
  const hideLoader = () => loader?.classList.add("is-hidden");
  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1800); // Fallback if a resource is slow.

  // Footer year
  $("#year").textContent = new Date().getFullYear();

  // Theme preference
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    themeToggle.setAttribute("aria-label", next === "light" ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري");
  });

  // Mobile navigation
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  $$(".nav-link").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  // Reveal content as it enters the viewport
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Project category filtering
  const filterButtons = $$(".filter-button");
  const projectCards = $$(".project-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    projectCards.forEach(card => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !visible);
    });
  }));

  // Back to top visibility
  const backToTop = $("#backToTop");
  const updateBackToTop = () => backToTop?.classList.toggle("visible", window.scrollY > 500);
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Contact form: demo by default. Configure Formspree endpoint to receive messages.
  const form = $("#contactForm");
  const formNote = $("#formNote");
  const FORMSPREE_ENDPOINT = ""; // Example: "https://formspree.io/f/xxxxxxxx"
  form?.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (!FORMSPREE_ENDPOINT) {
      formNote.textContent = "النموذج غير مربوط بعد. أضف رابط Formspree داخل script.js لتلقي الرسائل.";
      formNote.setAttribute("role", "status");
      return;
    }

    const submitButton = $(".submit-button", form);
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.textContent = "جارٍ الإرسال...";
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      formNote.textContent = "تم إرسال رسالتك بنجاح. شكراً لتواصلك!";
    } catch {
      formNote.textContent = "تعذر الإرسال حالياً. حاول مرة أخرى أو راسلني عبر البريد.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });

  // Mark the navigation link for the section currently in view.
  const sections = ["home", "about", "projects", "services", "contact"]
    .map(id => document.getElementById(id)).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$(".nav-link").forEach(link =>
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)
          );
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }
})();
