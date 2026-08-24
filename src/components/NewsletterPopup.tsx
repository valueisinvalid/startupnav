"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import { NEWSLETTER_OPEN_EVENT } from "@/lib/newsletter-events";

const STORAGE_KEY = "startupnav-newsletter-dismissed";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onOpen() {
      setOpen(true);
      setStatus("idle");
      setMessage("");
    }
    window.addEventListener(NEWSLETTER_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(NEWSLETTER_OPEN_EVENT, onOpen);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "Bir hata oluştu.");
        return;
      }

      setStatus("ok");
      setEmail("");
      window.setTimeout(dismiss, 1800);
    } catch {
      setStatus("err");
      setMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  }

  if (!open) return null;

  return (
    <aside className="newsletter-popup" aria-label="Bülten aboneliği">
      <button
        type="button"
        className="newsletter-popup-close"
        onClick={dismiss}
        aria-label="Kapat"
      >
        <X size={16} strokeWidth={1.75} />
      </button>

      {status !== "ok" ? <h3>Bültene abone ol</h3> : null}
      {status === "ok" ? (
        <div className="newsletter-success" aria-label="Abone olundu">
          <svg
            className="newsletter-check"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle className="newsletter-check-ring" cx="22" cy="22" r="20" />
            <path
              className="newsletter-check-mark"
              d="M13.5 22.5l5.5 5.5 11.5-12"
            />
          </svg>
        </div>
      ) : (
        <>
          <p>Yeni startup incelemeleri yayınlandığında haberin olsun.</p>

          <form className="newsletter-form" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="eposta@ornek.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Kaydediliyor…" : "Abone Ol"}
            </button>
          </form>

          {message && status === "err" ? (
            <p className="newsletter-msg err">{message}</p>
          ) : null}
        </>
      )}
    </aside>
  );
}
