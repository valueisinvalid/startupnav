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

function absoluteUrl(siteUrl: string, path: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildEmailHtml(post: {
  title: string;
  startupName: string;
  fundingAmount: string;
  imageUrl?: string;
  postUrl: string;
  siteUrl: string;
}) {
  const title = escapeHtml(post.title);
  const startupName = escapeHtml(post.startupName);
  const fundingAmount = escapeHtml(post.fundingAmount);
  const siteHost = post.siteUrl
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");
  const fontUrl = absoluteUrl(post.siteUrl, "/fonts/HussarBold.ttf");
  const imageUrl = post.imageUrl
    ? absoluteUrl(post.siteUrl, post.imageUrl)
    : "";

  return `<!DOCTYPE html>
<html lang="tr">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: "HussarBold";
        src: url("${escapeHtml(fontUrl)}") format("truetype");
        font-weight: 400;
        font-style: normal;
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
      <tr>
        <td align="center" style="padding:36px 20px 48px;">
          <table role="presentation" width="440" cellpadding="0" cellspacing="0" style="max-width:440px;width:100%;">
            <tr>
              <td style="padding:0 0 18px;border-bottom:1px solid #e8e8e8;">
                <a href="${escapeHtml(post.siteUrl)}" style="text-decoration:none;">
                  <span style="font-family:'HussarBold',Arial,Helvetica,sans-serif;font-size:15px;line-height:1;letter-spacing:-0.02em;color:#24262c;text-transform:lowercase;">
                    startupnav
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 0 0;">
                <p style="margin:0 0 8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#a0a6ae;">
                  ${startupName} · ${fundingAmount}
                </p>
                <h1 style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.4;font-weight:700;color:#24262c;">
                  ${title}
                </h1>
              </td>
            </tr>
            ${
              imageUrl
                ? `<tr>
              <td style="padding:0 0 16px;">
                <img src="${escapeHtml(imageUrl)}" alt="${startupName}" width="440" style="display:block;width:100%;max-width:440px;height:auto;border:0;" />
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:0 0 28px;">
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
