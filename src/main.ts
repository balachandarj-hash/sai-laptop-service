import "./style.css";

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
  if (window.innerWidth > 1100) setNavOpen(false);
});

const form = document.querySelector<HTMLFormElement>("[data-whatsapp-form]");
const formStatus = document.querySelector<HTMLElement>("[data-form-status]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const issue = String(data.get("issue") ?? "").trim();

  if (!name || !phone || !issue) {
    if (formStatus) {
      formStatus.textContent = "Add your name, phone, and the problem.";
      formStatus.classList.add("is-error");
    }
    return;
  }
  formStatus?.classList.remove("is-error");

  const text = `Hello Sai Laptop Service. My name is ${name}. Phone: ${phone}. I need help with: ${issue}.`;
  const url = `https://wa.me/919972447766?text=${encodeURIComponent(text)}`;
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
  if (formStatus) formStatus.textContent = "Opening WhatsApp with your message.";
});
