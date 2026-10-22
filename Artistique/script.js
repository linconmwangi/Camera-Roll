const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");

const revealElements = document.querySelectorAll(
  ".intro-grid, .section-heading, .gallery-card, .film-card, .event-image, .event-copy, .package, .quote-card, .booking-intro, .booking-form, .faq-intro, .faq-list, .contact-top, .contact-bottom",
);
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const updateScrollUI = () => {
  const isScrolled = window.scrollY > 30;
  header.classList.toggle("scrolled", isScrolled);
  backToTop.classList.toggle("visible", window.scrollY > 500);
};
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  nav.classList.toggle("open", !isOpen);
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  }
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const galleryCards = [...document.querySelectorAll(".gallery-card")];
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    galleryCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxCount = lightbox.querySelector(".lightbox-count");
let activePhoto = 0;
const visibleGalleryCards = () => galleryCards.filter((card) => !card.hidden);
const showPhoto = (index) => {
  const cards = visibleGalleryCards();
  activePhoto = (index + cards.length) % cards.length;
  const card = cards[activePhoto];
  const image = card.querySelector("img");
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = card.querySelector(".gallery-caption strong").textContent;
  lightboxCount.textContent = `${String(activePhoto + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
};
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const visibleIndex = visibleGalleryCards().indexOf(card);
    showPhoto(visibleIndex);
    lightbox.showModal();
  });
});
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activePhoto - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activePhoto + 1));
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
  if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
});

document.querySelectorAll("[data-package]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector('[name="package"]').value = button.dataset.package;
  });
});

const bookingForm = document.querySelector("#booking-form");
const phoneInput = bookingForm.querySelector('input[name="phone"]');
const validateKenyanPhone = () => {
  const number = phoneInput.value.trim().replace(/[\s()-]/g, "");
  const isValid = !number || /^(?:\+254|0)[17]\d{8}$/.test(number);
  phoneInput.setCustomValidity(
    isValid ? "" : "Please enter a full mobile number, e.g.+254712345678 or 0712345678.",
  );
};
phoneInput.addEventListener("input", validateKenyanPhone);
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateKenyanPhone();
  if (!bookingForm.reportValidity()) return;
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  const label = submitButton.querySelector(".submit-label");
  const status = document.querySelector("#booking-status");
  submitButton.disabled = true;
  label.textContent = "Sending...";
  status.textContent = "";
  window.setTimeout(() => {
    status.textContent = "Thank you! I will get back to you within 24 hours.";
    bookingForm.reset();
    submitButton.disabled = false;
    label.textContent = "Let us make it happen";
  }, 850);
});

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  document.querySelector("#contact-status").textContent = "Thanks for saying hello! I will be in touch soon.";
  contactForm.reset();
});

const videoDialog = document.querySelector(".video-dialog");
const videoFrame = videoDialog.querySelector(".video-frame");
document.querySelectorAll(".film-thumb").forEach((button) => {
  button.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.video)}?autoplay=1&rel=0`;
    iframe.title = button.getAttribute("aria-label").replace("Play film: ", "");
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    videoFrame.replaceChildren(iframe);
    videoDialog.showModal();
  });
});
const closeVideo = () => {
  videoDialog.close();
  videoFrame.replaceChildren();
};
videoDialog.querySelector(".video-close").addEventListener("click", closeVideo);
videoDialog.addEventListener("click", (event) => {
  if (event.target === videoDialog) closeVideo();
});
videoDialog.addEventListener("close", () => videoFrame.replaceChildren());
