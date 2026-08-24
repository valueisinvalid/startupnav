export const NEWSLETTER_OPEN_EVENT = "startupnav:newsletter-open";

export function openNewsletterPopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NEWSLETTER_OPEN_EVENT));
}
