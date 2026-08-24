"use client";

import { openNewsletterPopup } from "@/lib/newsletter-events";

export default function NewsletterTrigger() {
  return (
    <button
      type="button"
      className="menu-list-trigger"
      onClick={openNewsletterPopup}
    >
      Bültene abone ol
    </button>
  );
}
