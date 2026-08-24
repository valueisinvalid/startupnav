"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowUp, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type SearchHit = {
  slug: string;
  title: string;
  startupName: string;
  fundingAmount: string;
};

export default function Toolbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(Array.isArray(data.results) ? data.results : []);
      } catch {
        if (!controller.signal.aborted) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, searchOpen]);

  function scrollTop() {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (results[0]) {
      window.location.href = `/posts/${results[0].slug}`;
    }
  }

  return (
    <div className="sidebar-tools">
      <div className="toolbar" id="toolbar">
          <button
            type="button"
            className="toolbar-btn"
            title="Ara"
            aria-label="Ara"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={14} strokeWidth={1.75} />
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="toolbar-btn"
            title="Yukarı çık"
            aria-label="Yukarı çık"
            onClick={scrollTop}
          >
            <ArrowUp size={14} strokeWidth={1.75} />
          </button>
        </div>

        {searchOpen ? (
          <div className="search-panel" role="dialog" aria-label="Yazı ara">
          <form className="search-panel-form" onSubmit={onSearchSubmit}>
            <span className="search-panel-icon" aria-hidden>
              <Search size={13} strokeWidth={1.75} />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Startup veya yazı ara…"
              autoComplete="off"
            />
            <button
              type="button"
              className="search-panel-close"
              onClick={closeSearch}
              aria-label="Aramayı kapat"
            >
              <X size={13} strokeWidth={1.75} />
            </button>
          </form>

          <div className="search-panel-results">
            {loading ? <p className="search-hint">Aranıyor…</p> : null}
            {!loading && query.trim().length >= 2 && results.length === 0 ? (
              <p className="search-hint">Sonuç bulunamadı.</p>
            ) : null}
            {!loading && query.trim().length < 2 ? (
              <p className="search-hint">En az 2 karakter yaz.</p>
            ) : null}
            <ul>
              {results.map((hit) => (
                <li key={hit.slug}>
                  <Link href={`/posts/${hit.slug}`} onClick={closeSearch}>
                    <span className="search-hit-title">{hit.title}</span>
                    <span className="search-hit-meta" lang="en">
                      {hit.startupName} · {hit.fundingAmount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        ) : null}
    </div>
  );
}
