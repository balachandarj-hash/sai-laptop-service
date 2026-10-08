import "./style.css";

const header = document.querySelector<HTMLElement>("[data-header]");
const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const nav = document.querySelector<HTMLElement>("[data-nav]");

function setNavOpen(open: boolean): void {
  if (!toggle || !nav) return;
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
}

toggle?.addEventListener("click", () => {
  setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNavOpen(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setNavOpen(false);
});

function onScroll(): void {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const copyButton = document.querySelector<HTMLButtonElement>("[data-copy-address]");
const address = document.querySelector<HTMLElement>("[data-address]");
const copyStatus = document.querySelector<HTMLElement>("[data-copy-status]");
let copyTimer = 0;

function showCopyStatus(message: string, isError: boolean): void {
  if (!copyStatus) return;
  copyStatus.textContent = message;
  copyStatus.classList.toggle("is-error", isError);
  window.clearTimeout(copyTimer);
  copyTimer = window.setTimeout(() => {
    copyStatus.textContent = "";
    copyStatus.classList.remove("is-error");
  }, 2800);
}

copyButton?.addEventListener("click", async () => {
  const text = address?.dataset.address?.trim();
  if (!text) {
    showCopyStatus("Address is missing from this page.", true);
    return;
  }

  try {
    if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(text);
    showCopyStatus("Address copied.", false);
  } catch {
    showCopyStatus("Could not copy. Select the address instead.", true);
  }
});
