const privacyModal = document.querySelector(".privacy-modal");
const privacyPanel = document.querySelector(".privacy-modal__panel");
const openPrivacyLinks = document.querySelectorAll("[data-open-privacy]");
const closePrivacyControls = document.querySelectorAll("[data-close-privacy]");

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

openPrivacyLinks.forEach((link) => {
  link.addEventListener("click", openPrivacyModal);
});

closePrivacyControls.forEach((control) => {
  control.addEventListener("click", closePrivacyModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && privacyModal && privacyModal.hidden === false) {
    closePrivacyModal();
  }
});

if (window.location.hash === "#privacy-policy") {
  openPrivacyModal();
}
