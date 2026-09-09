const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();
let activeThemeTransition;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  document
    .querySelector("#theme-btn")
    ?.setAttribute(
      "aria-label",
      `Switch to ${themeValue === "light" ? "dark" : "light"} theme`,
    );

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

function getRevealGeometry(button) {
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  // Chromium measures root view-transition snapshots in backing-store pixels.
  // iOS WebKit keeps them in CSS pixels.
  const isWebKitIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1 &&
      /Safari/.test(navigator.userAgent) &&
      !/Chrome|Chromium|CriOS|Edg/.test(navigator.userAgent));
  const scale = isWebKitIOS ? 1 : window.devicePixelRatio || 1;

  return {
    x: x * scale,
    y: y * scale,
    radius: radius * scale,
  };
}

function switchTheme(button) {
  const nextTheme = themeValue === "light" ? "dark" : "light";

  if (!document.startViewTransition || prefersReducedMotion.matches) {
    themeValue = nextTheme;
    setPreference();
    return;
  }

  activeThemeTransition?.skipTransition?.();

  const root = document.documentElement;
  const reveal = getRevealGeometry(button);
  const goingLight = nextTheme === "light";

  root.classList.add("theme-transition");
  root.classList.toggle("theme-transition-reverse", goingLight);

  const transition = document.startViewTransition(() => {
    themeValue = nextTheme;
    setPreference();
  });
  activeThemeTransition = transition;

  const safetyTimeout = window.setTimeout(
    () => transition.skipTransition?.(),
    2000,
  );

  let revealAnimation;
  transition.ready
    .then(() => {
      const keyframes = [
        {
          clipPath: `circle(0 at ${reveal.x}px ${reveal.y}px)`,
        },
        {
          clipPath: `circle(${reveal.radius}px at ${reveal.x}px ${reveal.y}px)`,
        },
      ];

      revealAnimation = root.animate(
        goingLight ? keyframes.slice().reverse() : keyframes,
        {
          duration: goingLight ? 500 : 600,
          easing: "cubic-bezier(.4, 0, .2, 1)",
          pseudoElement: `::view-transition-${goingLight ? "old" : "new"}(root)`,
          fill: "forwards",
        },
      );
    })
    .catch(() => {});

  transition.finished
    .catch(() => {})
    .finally(() => {
      window.clearTimeout(safetyTimeout);
      revealAnimation?.cancel();
      if (activeThemeTransition !== transition) return;
      root.classList.remove("theme-transition", "theme-transition-reverse");
      activeThemeTransition = undefined;
    });
}

// set early so no page flashes / CSS is made aware
reflectPreference();

window.addEventListener("load", () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    reflectPreference();

    // now this script can find and listen for clicks on the control
    document.querySelector("#theme-btn")?.addEventListener("click", (event) => {
      switchTheme(event.currentTarget);
    });
  }

  setThemeFeature();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", setThemeFeature);
});

// Set theme-color value before page transition
// to avoid navigation bar color flickering in Android dark mode
document.addEventListener("astro:before-swap", (event) => {
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  event.newDocument
    .querySelector("meta[name='theme-color']")
    ?.setAttribute("content", bgColor);
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
