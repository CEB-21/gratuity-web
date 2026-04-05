const privacyModal = document.querySelector(".privacy-modal");
const privacyPanel = document.querySelector(".privacy-modal__panel");
const openPrivacyLinks = document.querySelectorAll("[data-open-privacy]");
const closePrivacyControls = document.querySelectorAll("[data-close-privacy]");
const appStoreLinks = document.querySelectorAll("[data-track-app-store]");

let lastFocusedElement = null;

function openPrivacyModal(event) {
  if (event) {
    event.preventDefault();
  }

  if (!privacyModal || !privacyPanel) {
    return;
  }

  lastFocusedElement = document.activeElement;
  privacyModal.hidden = false;
  document.body.classList.add("modal-open");
  privacyPanel.focus();

  if (typeof window.gtag === "function") {
    window.gtag("event", "privacy_policy_opened");
  }
}

function closePrivacyModal() {
  if (!privacyModal || !privacyPanel) {
    return;
  }

  privacyModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (window.location.hash === "#privacy-policy") {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

function trackAppStoreClick(event) {
  if (typeof window.gtag !== "function") {
    return;
  }

  const link = event.currentTarget;

  window.gtag("event", "app_store_cta_clicked", {
    cta_location: link.dataset.ctaLocation || "unknown",
    destination_path: link.pathname || "",
    destination_host: link.hostname || ""
  });
}

openPrivacyLinks.forEach((link) => {
  link.addEventListener("click", openPrivacyModal);
});

closePrivacyControls.forEach((control) => {
  control.addEventListener("click", closePrivacyModal);
});

appStoreLinks.forEach((link) => {
  link.addEventListener("click", trackAppStoreClick);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && privacyModal && privacyModal.hidden === false) {
    closePrivacyModal();
  }
});

if (window.location.hash === "#privacy-policy") {
  openPrivacyModal();
}
