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
  const imageUrl = post.imageUrl
    ? absoluteUrl(post.siteUrl, post.imageUrl)
    : "";

  return `<!DOCTYPE html>
<html lang="tr">
  <body style="margin:0;padding:0;background:#f4f4f5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 20px;border-bottom:1px solid #e8e8e8;">
                <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1;letter-spacing:-0.02em;color:#24262c;">
                  startupnav
                </p>
                <p style="margin:0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#002FA7;">
                  you can start up nav
                </p>
              </td>
            </tr>
            ${
              imageUrl
                ? `<tr>
              <td style="padding:0;line-height:0;">
                <img src="${escapeHtml(imageUrl)}" alt="${startupName}" width="520" style="display:block;width:100%;max-width:520px;height:auto;border:0;" />
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 28px 8px;">
                <p style="margin:0 0 10px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#a0a6ae;">
                  Yeni inceleme
                </p>
                <h1 style="margin:0 0 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;line-height:1.35;font-weight:700;color:#24262c;">
                  ${title}
                </h1>
                <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:15px;font-style:italic;color:#78806e;">
                  ${startupName}
                </p>
                <p style="margin:0 0 22px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#a0a6ae;">
                  ${fundingAmount}
                </p>
                <a href="${escapeHtml(post.postUrl)}" style="display:inline-block;background:#002FA7;color:#ffffff;text-decoration:none;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:11px 18px;border-radius:999px;">
                  Yazıyı oku
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 28px;">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.55;color:#a0a6ae;">
                  Bu maili startupnav bültenine abone olduğun için aldın.
                  <a href="${escapeHtml(post.siteUrl)}" style="color:#002FA7;text-decoration:none;">${escapeHtml(siteHost)}</a>
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
