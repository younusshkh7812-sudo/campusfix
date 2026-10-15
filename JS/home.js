
"use strict";

// 1. Mobile navigation
const menuToggle = document.getElementById("homeMenuToggle");
const homeNav = document.getElementById("homeNav");

if (menuToggle && homeNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = homeNav.classList.toggle("home-nav-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  homeNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      homeNav.classList.remove("home-nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !homeNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      homeNav.classList.remove("home-nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// 2. Smooth scrolling for section links
document.documentElement.style.scrollBehavior = "smooth";

document.querySelectorAll('.home-page a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start"
    });
  });
});

// 3. Reveal sections when they enter the screen
const revealElements = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("home-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("home-revealed");
  });
}

// 4. Load actual issue statistics from Flask
const API_URL = "/api";

async function loadHomeStats() {
  const statsNote = document.getElementById("homeStatsNote");

  try {
    const response = await fetch(`${API_URL}/issues`);

    if (!response.ok) {
      throw new Error("The issues API returned an error.");
    }

    const issues = await response.json();

    if (!Array.isArray(issues)) {
      throw new Error("Unexpected issues data format.");
    }

    const normalise = (value) =>
      String(value ?? "").trim().toLowerCase();

    const resolved = issues.filter(
      (issue) => normalise(issue.status) === "resolved"
    ).length;

    const inProgress = issues.filter(
      (issue) => normalise(issue.status) === "in progress"
    ).length;

    const total = issues.length;

    const resolutionRate =
      total === 0 ? 0 : Math.round((resolved / total) * 100);

    // Update the hero preview
    document.getElementById("homeTotalIssues").textContent = total;
    document.getElementById("homeResolvedIssues").textContent = resolved;
    document.getElementById("homeResolutionRate").textContent =
      `${resolutionRate}%`;

    document.getElementById("homeProgressBar").style.width =
      `${resolutionRate}%`;

    // Update the statistics section
    document.getElementById("homeMetricTotal").textContent = total;
    document.getElementById("homeMetricResolved").textContent = resolved;
    document.getElementById("homeMetricActive").textContent = inProgress;

    if (statsNote) {
      statsNote.textContent = "Statistics are based on the current issue records.";
    }
  } catch (error) {
    console.error("Could not load CampusFix statistics:", error);

    if (statsNote) {
      statsNote.textContent =
        "Live statistics are temporarily unavailable. Open the dashboard to check issue records.";
    }
  }
}

// 5. Automatically update the footer year
const yearElement = document.getElementById("homeYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 6. Back-to-top action
const backToTop = document.getElementById("homeBackToTop");

if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });
}

// Start loading the dashboard data
loadHomeStats();
