import { Resend } from "resend";
import { prisma } from "./prisma";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes("xxxxxxxxxx") || key.includes("your_api_key")) {
    return null;
  }
  return new Resend(key);
}

export async function notifySubscribers(post: {
  title: string;
  slug: string;
  startupName: string;
  fundingAmount: string;
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

  const subject = `The StartupNav: Yeni Yazı Yayınlandı - ${post.title}`;
  const html = `
    <div style="font-family: 'PT Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #2d2d2f;">
      <h1 style="font-size: 22px; margin-bottom: 8px;">The StartupNav</h1>
      <p style="color: #a6acaf; margin-top: 0;">Yeni bir startup incelemesi yayınlandı.</p>
      <hr style="border: none; border-top: 1px solid #e9e9e9; margin: 24px 0;" />
      <h2 style="font-size: 18px; margin-bottom: 8px;">${post.title}</h2>
      <p style="margin: 4px 0;"><strong>Startup:</strong> ${post.startupName}</p>
      <p style="margin: 4px 0;"><strong>Yatırım:</strong> ${post.fundingAmount}</p>
      <p style="margin: 24px 0;">
        <a href="${postUrl}" style="display: inline-block; background: #2d2d2f; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 999px;">
          Yazıyı Oku
        </a>
      </p>
      <p style="color: #bdc3c7; font-size: 12px;">Bu maili The StartupNav bültenine abone olduğunuz için aldınız.</p>
    </div>
  `;

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
