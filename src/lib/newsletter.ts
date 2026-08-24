import { Resend } from "resend";
import { prisma } from "./prisma";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("xxxxxxxxxx") || key.includes("your_api_key")) {
    return null;
  }
  return new Resend(key);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function englishUppercase(value: string) {
  return value.toLocaleUpperCase("en-US");
}

function excerpt(content: string) {
  const first = content
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith("!["));
  if (!first) return "";
  const plain = first
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= 160) return plain;
  return `${plain.slice(0, 157).trimEnd()}…`;
}

function absoluteUrl(siteUrl: string, path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildEmailHtml(post: {
  title: string;
  startupName: string;
  fundingAmount: string;
  content?: string;
  imageUrl?: string;
  postUrl: string;
  siteUrl: string;
}) {
  const title = escapeHtml(post.title);
  const meta = escapeHtml(
    englishUppercase(`${post.startupName} · ${post.fundingAmount}`),
  );
  const preview = post.content ? escapeHtml(excerpt(post.content)) : "";
  const siteHost = post.siteUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const wordmarkUrl = absoluteUrl(post.siteUrl, "/images/email-wordmark.png");
  const imageUrl = post.imageUrl
    ? absoluteUrl(post.siteUrl, post.imageUrl)
    : "";

  return `<!DOCTYPE html>
<html lang="tr">
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:36px 20px 48px;">
          <table role="presentation" width="440" cellpadding="0" cellspacing="0" style="max-width:440px;width:100%;">
            <tr>
              <td style="padding:0 0 18px;border-bottom:1px solid #e8e8e8;">
                <a href="${escapeHtml(post.siteUrl)}" style="text-decoration:none;border:0;">
                  <img src="${escapeHtml(wordmarkUrl)}" alt="startupnav" width="120" height="22" style="display:block;width:120px;height:22px;border:0;" />
                </a>
              </td>
            </tr>
            ${
              imageUrl
                ? `<tr>
              <td style="padding:22px 0 0;">
                <img src="${escapeHtml(imageUrl)}" alt="" width="440" style="display:block;width:100%;max-width:440px;height:auto;border:0;" />
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:${imageUrl ? "18px" : "22px"} 0 28px;">
                <p lang="en" style="margin:0 0 8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.1em;color:#a0a6ae;">
                  ${meta}
                </p>
                <h1 style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;font-weight:700;color:#24262c;">
                  ${title}
                </h1>
                ${
                  preview
                    ? `<p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.55;font-style:italic;color:#78806e;">
                  ${preview}
                </p>`
                    : ""
                }
                <a href="${escapeHtml(post.postUrl)}" style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.04em;color:#002FA7;text-decoration:none;border-bottom:1px solid #002FA7;">
                  yazıyı oku →
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0 0;border-top:1px solid #e8e8e8;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;line-height:1.5;color:#a0a6ae;">
                  Bülten aboneliğin için gönderildi ·
                  <a href="${escapeHtml(post.siteUrl)}" style="color:#a0a6ae;text-decoration:none;">${escapeHtml(siteHost)}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function notifySubscribers(post: {
  title: string;
  slug: string;
  startupName: string;
  fundingAmount: string;
  content?: string;
  imageUrl?: string;
}) {
  const resend = getResend();
  const subscribers = await prisma.subscriber.findMany();

  if (subscribers.length === 0) {
    return { sent: 0, skipped: true, reason: "no_subscribers" as const };
  }

  if (!resend) {
    console.warn(
      "[newsletter] RESEND_API_KEY eksik — mail gönderilmedi. Abone sayısı:",
      subscribers.length
    );
    return { sent: 0, skipped: true, reason: "no_api_key" as const };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const from =
    process.env.RESEND_FROM_EMAIL || "The StartupNav <onboarding@resend.dev>";
  const postUrl = `${siteUrl}/posts/${post.slug}`;

  const subject = `startupnav · ${post.startupName}`;
  const html = buildEmailHtml({
    title: post.title,
    startupName: post.startupName,
    fundingAmount: post.fundingAmount,
    content: post.content,
    imageUrl: post.imageUrl,
    postUrl,
    siteUrl,
  });

  let sent = 0;
  for (const sub of subscribers) {
    try {
      await resend.emails.send({
        from,
        to: sub.email,
        subject,
        html,
      });
      sent += 1;
    } catch (err) {
      console.error("[newsletter] send failed for", sub.email, err);
    }
  }

  return { sent, skipped: false as const };
}
