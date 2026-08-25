"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type AdminPost = {
  id: string;
  slug: string;
  title: string;
  startupName: string;
  fundingAmount: string;
  imageUrl: string;
};

const emptyForm = {
  title: "",
  startupName: "",
  fundingAmount: "",
  content: "",
  imageUrl: "/images/post-phone.png",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [title, setTitle] = useState(emptyForm.title);
  const [startupName, setStartupName] = useState(emptyForm.startupName);
  const [fundingAmount, setFundingAmount] = useState(emptyForm.fundingAmount);
  const [content, setContent] = useState(emptyForm.content);
  const [imageUrl, setImageUrl] = useState(emptyForm.imageUrl);
  const [notify, setNotify] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [createdSlug, setCreatedSlug] = useState("");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [listStatus, setListStatus] = useState<"idle" | "loading" | "err">(
    "idle"
  );
  const [listMessage, setListMessage] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [loadingEditId, setLoadingEditId] = useState("");

  function resetForm() {
    setTitle(emptyForm.title);
    setStartupName(emptyForm.startupName);
    setFundingAmount(emptyForm.fundingAmount);
    setContent(emptyForm.content);
    setImageUrl(emptyForm.imageUrl);
    setNotify(true);
    setEditingId(null);
    setEditingSlug("");
    setCreatedSlug("");
  }

  async function loadPosts(adminPassword = password) {
    if (!adminPassword) {
      setListStatus("err");
      setListMessage("Önce admin şifresini gir.");
      return false;
    }

    setListStatus("loading");
    setListMessage("");

    try {
      const res = await fetch("/api/posts", {
        headers: { "x-admin-password": adminPassword },
      });
      const data = await res.json();

      if (!res.ok) {
        setListStatus("err");
        setListMessage(data.error || "Yazılar yüklenemedi.");
        setPosts([]);
        setUnlocked(false);
        return false;
      }

      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setListStatus("idle");
      setUnlocked(true);
      return true;
    } catch {
      setListStatus("err");
      setListMessage("Bağlantı hatası.");
      setUnlocked(false);
      return false;
    }
  }

  async function unlock(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const ok = await loadPosts(password);
    if (ok) {
      setStatus("idle");
      setMessage("");
    } else {
      setStatus("err");
      setMessage("Şifre hatalı veya yazılar yüklenemedi.");
    }
  }

  async function startEdit(id: string) {
    if (!password) return;
    setLoadingEditId(id);
    setMessage("");
    setStatus("idle");

    try {
      const res = await fetch(`/api/posts?id=${encodeURIComponent(id)}`, {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();

      if (!res.ok || !data.post) {
        setStatus("err");
        setMessage(data.error || "Yazı yüklenemedi.");
        return;
      }

      const post = data.post;
      setEditingId(post.id);
      setEditingSlug(post.slug);
      setTitle(post.title);
      setStartupName(post.startupName);
      setFundingAmount(post.fundingAmount);
      setContent(post.content);
      setImageUrl(post.imageUrl);
      setNotify(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("err");
      setMessage("Bağlantı hatası.");
    } finally {
      setLoadingEditId("");
    }
  }

  async function deletePost(id: string) {
    if (!window.confirm("Bu yazı silinsin mi?")) return;

    setDeletingId(id);
    setListMessage("");

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, id }),
      });
      const data = await res.json();

      if (!res.ok) {
        setListStatus("err");
        setListMessage(data.error || "Yazı silinemedi.");
        return;
      }

      if (editingId === id) resetForm();
      setPosts((current) => current.filter((post) => post.id !== id));
      setListStatus("idle");
      setListMessage(data.message || "Yazı silindi.");
    } catch {
      setListStatus("err");
      setListMessage("Bağlantı hatası.");
    } finally {
      setDeletingId("");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    setCreatedSlug("");

    try {
      const isEdit = Boolean(editingId);
      const res = await fetch("/api/posts", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEdit
            ? {
                password,
                id: editingId,
                title,
                startupName,
                fundingAmount,
                content,
                imageUrl,
              }
            : {
                password,
                title,
                startupName,
                fundingAmount,
                content,
                imageUrl,
                notify,
              }
        ),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "İşlem başarısız.");
        return;
      }

      const nextSlug = data.slug || editingSlug;
      if (isEdit) {
        setEditingId(null);
        setEditingSlug("");
      } else {
        setTitle(emptyForm.title);
        setStartupName(emptyForm.startupName);
        setFundingAmount(emptyForm.fundingAmount);
        setContent(emptyForm.content);
        setImageUrl(emptyForm.imageUrl);
        setNotify(true);
        setEditingId(null);
        setEditingSlug("");
      }
      setCreatedSlug(nextSlug);
      setStatus("ok");
      setMessage(
        data.message || (isEdit ? "Yazı güncellendi." : "Yazı yayınlandı.")
      );
      await loadPosts(password);
    } catch {
      setStatus("err");
      setMessage("Bağlantı hatası.");
    }
  }

  if (!unlocked) {
    return (
      <div className="admin-shell">
        <header className="admin-top">
          <Link href="/" className="admin-back">
            ← The StartupNav
          </Link>
          <h1>Admin</h1>
        </header>

        <form className="admin-unlock" onSubmit={unlock}>
          <label>
            Admin şifresi
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder=".env → ADMIN_PASSWORD"
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Giriş…" : "Panele gir"}
          </button>
          {message ? (
            <p className={`newsletter-msg ${status === "ok" ? "ok" : "err"}`}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <Link href="/" className="admin-back">
            ← The StartupNav
          </Link>
          <h1>{editingId ? "Yazıyı düzenle" : "Yeni yazı"}</h1>
          <p className="admin-lead">
            {editingId
              ? `Slug sabit kalır: ${editingSlug}`
              : "Başlık, yatırım ve metni doldurup yayınla."}
          </p>
        </div>
        <div className="admin-top-actions">
          {editingId ? (
            <button type="button" className="admin-btn-ghost" onClick={resetForm}>
              Yeni yazıya dön
            </button>
          ) : null}
          <button
            type="button"
            className="admin-btn-ghost"
            onClick={() => loadPosts()}
            disabled={listStatus === "loading"}
          >
            {listStatus === "loading" ? "Yenileniyor…" : "Listeyi yenile"}
          </button>
        </div>
      </header>

      <div className="admin-layout">
        <section className="admin-panel admin-panel-form">
          <form className="admin-form" onSubmit={onSubmit}>
            <div className="admin-form-grid">
              <label>
                Başlık
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Luron AI: Çağrı Merkezlerini…"
                />
              </label>

              <label>
                Startup adı
                <input
                  required
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="Örn: Luron AI"
                />
              </label>

              <label>
                Aldığı yatırım
                <input
                  required
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  placeholder="Örn: Pre-seed $1M"
                />
              </label>

              <label>
                Görsel URL
                <input
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/posts/luron-ai.webp"
                />
              </label>
            </div>

            <label className="admin-form-full">
              İnceleme metni
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Yazının gövdesi…"
              />
            </label>

            {!editingId ? (
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={notify}
                  onChange={(e) => setNotify(e.target.checked)}
                />
                Abonelere e-posta bildirimi gönder
              </label>
            ) : null}

            <div className="admin-form-actions">
              <button type="submit" disabled={status === "loading"}>
                {status === "loading"
                  ? editingId
                    ? "Kaydediliyor…"
                    : "Yayınlanıyor…"
                  : editingId
                    ? "Değişiklikleri kaydet"
                    : "Yazıyı yayınla"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  className="admin-btn-ghost"
                  onClick={resetForm}
                >
                  Vazgeç
                </button>
              ) : null}
            </div>
          </form>

          {message ? (
            <p
              className={`newsletter-msg ${status === "ok" ? "ok" : "err"}`}
              style={{ marginTop: 16 }}
            >
              {message}
              {createdSlug ? (
                <>
                  {" "}
                  <Link href={`/posts/${createdSlug}`}>Yazıyı görüntüle →</Link>
                </>
              ) : null}
            </p>
          ) : null}
        </section>

        <aside className="admin-panel admin-panel-list">
          <div className="admin-list-head">
            <h2>Yazılar</h2>
            <span>{posts.length}</span>
          </div>

          {listMessage ? (
            <p
              className={`newsletter-msg ${listStatus === "err" ? "err" : "ok"}`}
            >
              {listMessage}
            </p>
          ) : null}

          {posts.length === 0 && listStatus !== "loading" ? (
            <p className="admin-lead">Henüz yazı yok.</p>
          ) : (
            <ul className="admin-post-list">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className={`admin-post-item${editingId === post.id ? " is-active" : ""}`}
                >
                  <div>
                    <strong>{post.title}</strong>
                    <span>
                      {post.startupName} · {post.fundingAmount}
                    </span>
                    <span className="admin-post-slug">{post.slug}</span>
                  </div>
                  <div className="admin-post-actions">
                    <Link href={`/posts/${post.slug}`} target="_blank">
                      Aç
                    </Link>
                    <button
                      type="button"
                      className="admin-btn-ghost"
                      onClick={() => startEdit(post.id)}
                      disabled={loadingEditId === post.id}
                    >
                      {loadingEditId === post.id ? "…" : "Düzenle"}
                    </button>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      onClick={() => deletePost(post.id)}
                      disabled={deletingId === post.id}
                    >
                      {deletingId === post.id ? "…" : "Sil"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
