(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const icon = toggle.querySelector(".theme-icon");
  const label = toggle.querySelector(".theme-label");
  const year = document.getElementById("year");

  const STORAGE_KEY = "tronk-theme";

  function readStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Si no se puede guardar, la web sigue funcionando
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    saveTheme(theme);

    if (theme === "dark") {
      icon.textContent = "☀️";
      label.textContent = "Claro";
      toggle.setAttribute("aria-pressed", "true");
    } else {
      icon.textContent = "🌙";
      label.textContent = "Oscuro";
      toggle.setAttribute("aria-pressed", "false");
    }
  }

  let currentTheme = readStoredTheme() || getSystemTheme();

  applyTheme(currentTheme);

  toggle.addEventListener("click", function () {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });

  // Cambiar automáticamente si el usuario no ha elegido tema manualmente
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      if (!readStoredTheme()) {
        currentTheme = event.matches ? "dark" : "light";
        applyTheme(currentTheme);
      }
    });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Animación de aparición al hacer scroll
  const sections = document.querySelectorAll(".section");
  sections.forEach(function (section) {
    section.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
    });
  }
})();