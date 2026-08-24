"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type AdminPost = {
  id: string;
  slug: string;
  title: string;
  startupName: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [startupName, setStartupName] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/post-phone.png");
  const [notify, setNotify] = useState(true);
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

  async function loadPosts(adminPassword = password) {
    if (!adminPassword) {
      setListStatus("err");
      setListMessage("Önce admin şifresini gir.");
      return;
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
        return;
      }

      setPosts(Array.isArray(data.posts) ? data.posts : []);
      setListStatus("idle");
    } catch {
      setListStatus("err");
      setListMessage("Bağlantı hatası.");
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
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          title,
          startupName,
          fundingAmount,
          content,
          imageUrl,
          notify,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("err");
        setMessage(data.error || "Yazı oluşturulamadı.");
        return;
      }

      setStatus("ok");
      setMessage(data.message || "Yazı yayınlandı.");
      setCreatedSlug(data.slug);
      setTitle("");
      setStartupName("");
      setFundingAmount("");
      setContent("");
      await loadPosts(password);
    } catch {
      setStatus("err");
      setMessage("Bağlantı hatası.");
    }
  }

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <p style={{ marginTop: 0 }}>
          <Link href="/">← The StartupNav</Link>
        </p>
        <h1>Admin — Yeni Yazı</h1>
        <p className="admin-lead">
          Bu sayfa gizli bir yönetim paneli. Şifre <code>.env</code> içindeki{" "}
          <code>ADMIN_PASSWORD</code> değeridir.
        </p>

        <form className="admin-form" onSubmit={onSubmit}>
          <label>
            Admin şifresi
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>

          <label>
            Başlık
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Series B sonrası büyüme analizi"
            />
          </label>

          <label>
            Startup adı
            <input
              required
              value={startupName}
              onChange={(e) => setStartupName(e.target.value)}
              placeholder="Örn: Notion"
            />
          </label>

          <label>
            Aldığı yatırım
            <input
              required
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
              placeholder="Örn: Serie B — $50M"
            />
          </label>

          <label>
            İnceleme metni
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Yazının gövdesi…"
            />
          </label>

          <label>
            Görsel URL (public klasöründen)
            <input
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/post-phone.png"
            />
          </label>

          <label
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              textTransform: "none",
              letterSpacing: "normal",
              fontFamily: "inherit",
              fontWeight: 400,
              fontSize: "0.95rem",
            }}
          >
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            Abonelere e-posta bildirimi gönder
          </label>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Yayınlanıyor…" : "Yazıyı Yayınla"}
          </button>
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

        <section className="admin-posts">
          <h2>Yazıları sil</h2>
          <div className="admin-form admin-posts-toolbar">
            <button
              type="button"
              onClick={() => loadPosts()}
              disabled={listStatus === "loading"}
            >
              {listStatus === "loading" ? "Yükleniyor…" : "Yazıları listele"}
            </button>
          </div>

          {listMessage ? (
            <p className={`newsletter-msg ${listStatus === "err" ? "err" : "ok"}`}>
              {listMessage}
            </p>
          ) : null}

          {posts.length === 0 && listStatus !== "loading" ? (
            <p className="admin-lead">Listelenecek yazı yok.</p>
          ) : (
            <ul className="admin-post-list">
              {posts.map((post) => (
                <li key={post.id} className="admin-post-item">
                  <div>
                    <strong>{post.title}</strong>
                    <span>
                      {post.startupName} · {post.slug}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    disabled={deletingId === post.id}
                  >
                    {deletingId === post.id ? "Siliniyor…" : "Sil"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
