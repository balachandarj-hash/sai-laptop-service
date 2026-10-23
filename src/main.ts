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

const blogGrid = document.querySelector<HTMLElement>("[data-blog-grid]");
const blogSearch = document.querySelector<HTMLInputElement>("[data-blog-search]");
const blogEmpty = document.querySelector<HTMLElement>("[data-blog-empty]");
const blogChips = [...document.querySelectorAll<HTMLButtonElement>("[data-blog-filter]")];

if (blogGrid) {
  const cards = [...blogGrid.querySelectorAll<HTMLElement>("[data-blog-card]")];
  let topic = "all";

  const applyBlogFilter = (): void => {
    const query = (blogSearch?.value ?? "").trim().toLowerCase();
    let shown = 0;
    for (const card of cards) {
      const topics = (card.dataset.topics ?? "").split(/\s+/);
      const haystack = (card.dataset.text ?? "").toLowerCase();
      const topicMatch = topic === "all" || topics.includes(topic);
      const textMatch = query.length === 0 || haystack.includes(query);
      const visible = topicMatch && textMatch;
      card.hidden = !visible;
      if (visible) shown += 1;
    }
    if (blogEmpty) blogEmpty.hidden = shown !== 0;
  };

  for (const chip of blogChips) {
    chip.addEventListener("click", () => {
      topic = chip.dataset.blogFilter ?? "all";
      for (const item of blogChips) {
        const selected = item === chip;
        item.classList.toggle("is-on", selected);
        item.setAttribute("aria-pressed", String(selected));
      }
      applyBlogFilter();
    });
  }

  blogSearch?.addEventListener("input", applyBlogFilter);
}

document.querySelectorAll<HTMLElement>("[data-parts-slider]").forEach((slider) => {
  const pause = () => slider.classList.add("is-paused");
  const resume = () => slider.classList.remove("is-paused");
  slider.addEventListener("pointerdown", pause);
  slider.addEventListener("pointerup", resume);
  slider.addEventListener("pointercancel", resume);
  slider.addEventListener("pointerleave", resume);
});

const loadReviews = document.querySelector<HTMLButtonElement>("[data-load-reviews]");
loadReviews?.addEventListener("click", () => {
  document.querySelectorAll<HTMLElement>("[data-review-more]").forEach((row) => {
    row.hidden = false;
  });
  loadReviews.hidden = true;
});
